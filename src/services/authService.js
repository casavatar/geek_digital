import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from './firebase'

class AuthService {
  constructor() {
    this.currentUser = null
    this.authListeners = []
  }

  /**
   * Initialize auth state listener
   */
  initAuthListener(callback) {
    if (!auth) {
      console.warn('Auth not initialized. Using demo mode.')
      return () => {}
    }

    return onAuthStateChanged(auth, (user) => {
      this.currentUser = user
      if (callback) callback(user)
    })
  }

  /**
   * Get current authenticated user
   */
  async getCurrentUser() {
    if (!auth) {
      // Demo mode - return mock user if one exists in localStorage
      const demoUser = localStorage.getItem('demo_user')
      return demoUser ? JSON.parse(demoUser) : null
    }

    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe()
        resolve(user)
      })
    })
  }

  /**
   * Login with email and password
   */
  async login(email, password) {
    if (!auth) {
      // Demo mode
      const demoUser = {
        uid: 'demo-user-' + Date.now(),
        email,
        displayName: email.split('@')[0],
        emailVerified: true
      }
      localStorage.setItem('demo_user', JSON.stringify(demoUser))
      return demoUser
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      return userCredential.user
    } catch (error) {
      throw this.handleAuthError(error)
    }
  }

  /**
   * Register new user
   */
  async register(email, password, displayName) {
    if (!auth) {
      // Demo mode
      const demoUser = {
        uid: 'demo-user-' + Date.now(),
        email,
        displayName: displayName || email.split('@')[0],
        emailVerified: false
      }
      localStorage.setItem('demo_user', JSON.stringify(demoUser))
      return demoUser
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      // Update profile with display name
      if (displayName) {
        await updateProfile(userCredential.user, { displayName })
      }

      return userCredential.user
    } catch (error) {
      throw this.handleAuthError(error)
    }
  }

  /**
   * Logout current user
   */
  async logout() {
    if (!auth) {
      // Demo mode
      localStorage.removeItem('demo_user')
      return
    }

    try {
      await signOut(auth)
    } catch (error) {
      throw this.handleAuthError(error)
    }
  }

  /**
   * Send password reset email
   */
  async resetPassword(email) {
    if (!auth) {
      // Demo mode - just log it
      console.log('Demo mode: Password reset email would be sent to', email)
      return
    }

    try {
      await sendPasswordResetEmail(auth, email)
    } catch (error) {
      throw this.handleAuthError(error)
    }
  }

  /**
   * Handle auth errors and return user-friendly messages
   */
  handleAuthError(error) {
    const errorMessages = {
      'auth/user-not-found': 'No account found with this email.',
      'auth/wrong-password': 'Incorrect password.',
      'auth/email-already-in-use': 'An account with this email already exists.',
      'auth/weak-password': 'Password should be at least 6 characters.',
      'auth/invalid-email': 'Invalid email address.',
      'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
      'auth/network-request-failed': 'Network error. Please check your connection.'
    }

    const message = errorMessages[error.code] || error.message || 'An error occurred.'
    return new Error(message)
  }
}

export const authService = new AuthService()

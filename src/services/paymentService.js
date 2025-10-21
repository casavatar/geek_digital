import { loadStripe } from '@stripe/stripe-js'

class PaymentService {
  constructor() {
    this.stripe = null
    this.stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY
    this.paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID
  }

  /**
   * Initialize Stripe
   */
  async initStripe() {
    if (!this.stripePublicKey) {
      console.warn('Stripe public key not configured. Payment features disabled.')
      return null
    }

    if (!this.stripe) {
      this.stripe = await loadStripe(this.stripePublicKey)
    }
    return this.stripe
  }

  /**
   * Create Stripe checkout session
   */
  async createStripeCheckout(items) {
    try {
      const stripe = await this.initStripe()
      if (!stripe) {
        throw new Error('Stripe not initialized')
      }

      // In production, this would call your backend API to create a checkout session
      // For demo purposes, we'll simulate the flow
      console.log('Creating Stripe checkout for items:', items)

      // Demo mode - simulate successful checkout
      if (!import.meta.env.PROD) {
        return {
          success: true,
          sessionId: 'demo_session_' + Date.now(),
          mode: 'demo'
        }
      }

      // Production flow would look like:
      // const response = await fetch('/api/create-checkout-session', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ items })
      // })
      // const session = await response.json()
      // return stripe.redirectToCheckout({ sessionId: session.id })

    } catch (error) {
      console.error('Stripe checkout error:', error)
      throw error
    }
  }

  /**
   * Process Stripe payment
   */
  async processStripePayment(paymentMethod, amount) {
    try {
      // In production, send payment to backend
      console.log('Processing Stripe payment:', { paymentMethod, amount })

      // Demo mode
      return {
        success: true,
        transactionId: 'stripe_txn_' + Date.now(),
        amount,
        mode: 'demo'
      }
    } catch (error) {
      console.error('Stripe payment error:', error)
      throw error
    }
  }

  /**
   * Initialize PayPal SDK
   */
  loadPayPalSDK() {
    return new Promise((resolve, reject) => {
      if (!this.paypalClientId) {
        console.warn('PayPal client ID not configured.')
        resolve(null)
        return
      }

      if (window.paypal) {
        resolve(window.paypal)
        return
      }

      const script = document.createElement('script')
      script.src = `https://www.paypal.com/sdk/js?client-id=${this.paypalClientId}&currency=USD`
      script.onload = () => resolve(window.paypal)
      script.onerror = () => reject(new Error('Failed to load PayPal SDK'))
      document.head.appendChild(script)
    })
  }

  /**
   * Create PayPal order
   */
  async createPayPalOrder(items, totalAmount) {
    try {
      const paypal = await this.loadPayPalSDK()
      if (!paypal) {
        throw new Error('PayPal not initialized')
      }

      // In production, create order via backend
      console.log('Creating PayPal order:', { items, totalAmount })

      // Demo mode
      return {
        orderId: 'paypal_order_' + Date.now(),
        mode: 'demo'
      }

    } catch (error) {
      console.error('PayPal order creation error:', error)
      throw error
    }
  }

  /**
   * Capture PayPal payment
   */
  async capturePayPalPayment(orderId) {
    try {
      // In production, capture payment via backend
      console.log('Capturing PayPal payment:', orderId)

      // Demo mode
      return {
        success: true,
        transactionId: 'paypal_txn_' + Date.now(),
        orderId,
        mode: 'demo'
      }
    } catch (error) {
      console.error('PayPal capture error:', error)
      throw error
    }
  }

  /**
   * Verify payment (backend call)
   */
  async verifyPayment(transactionId, provider) {
    try {
      // In production, verify with backend
      console.log('Verifying payment:', { transactionId, provider })

      // Demo mode - always return success
      return {
        verified: true,
        transactionId,
        provider,
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      console.error('Payment verification error:', error)
      throw error
    }
  }
}

export const paymentService = new PaymentService()

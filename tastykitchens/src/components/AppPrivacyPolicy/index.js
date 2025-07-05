import React, {useState} from 'react'

// --- CSS Styles (intended for index.css) ---
const GlobalStyles = () => (
  <style>{`
    /* General Body Styles */
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background-color: #f0f2f5; /* Light gray background */
      color: #333; /* Default text color */
    }

    /* Container for centering content */
    .container {
      max-width: 960px;
      margin-left: auto;
      margin-right: auto;
      padding-left: 1rem;
      padding-right: 1rem;
    }

    /* App Styles */
    .app-container {
      min-height: 100vh;
      background-color: #f7fafc; /* gray-100 */
      font-family: sans-serif;
    }

    .app-header {
      background-color: #ffffff; /* white */
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); /* shadow-md */
      position: sticky;
      top: 0;
      z-index: 50;
    }
    .header-nav-list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 1rem; /* px-4 py-3 */
      list-style: none;
    }

    .app-nav ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      list-style: none;
      padding: 0.75rem 0;
      margin: 0;
    }

    .app-nav li {
      margin: 0.25rem; /* my-1 and space-x-2/4 approx */
    }

    .nav-button {
      padding: 0.5rem 0.75rem; /* px-3 py-2 */
      border-radius: 0.375rem; /* rounded-md */
      font-size: 0.875rem; /* text-sm */
      font-weight: 500; /* font-medium */
      transition: background-color 0.15s ease, color 0.15s ease;
      border: 1px solid transparent;
      cursor: pointer;
      background-color: transparent;
      color: #4a5568; /* text-gray-600 */
    }

    .nav-button:hover {
      background-color: #e0e7ff; /* hover:bg-indigo-100 */
      color: #4338ca; /* hover:text-indigo-700 */
    }

    .nav-button-active {
      background-color: #4f46e5; /* bg-indigo-600 */
      color: #ffffff; /* text-white */
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
    }

    .app-main {
      padding-top: 1rem; /* py-4 */
      padding-bottom: 2rem; /* md:py-8 */
    }
    
    .main-content-wrapper {
      background-color: #ffffff; /* bg-white */
      border-radius: 0.5rem; /* rounded-lg */
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06); /* shadow-lg */
      overflow: hidden;
    }

    .app-footer {
      text-align: center;
      padding: 1.5rem 0; /* py-6 */
      background-color: #e2e8f0; /* bg-gray-200 */
      color: #4a5568; /* text-gray-600 */
      font-size: 0.875rem; /* text-sm */
      margin-top: 2rem;
    }

    /* Page Content Styles */
    .page-container {
      padding: 1rem; /* p-4 */
    }
    @media (min-width: 768px) { /* md breakpoint */
      .page-container {
        padding: 1.5rem; /* md:p-6 */
      }
    }  

    .page-title {
      font-size: 1.5rem; /* text-2xl */
      font-weight: 700; /* font-bold */
      margin-bottom: 1.5rem; /* mb-6 */
      color: #1a202c; /* text-gray-800 */
    }
    @media (min-width: 768px) { /* md breakpoint */
      .page-title {
        font-size: 1.875rem; /* md:text-3xl */
      }
    }
    
    .page-last-updated {
      margin-bottom: 1rem; /* mb-4 */
      color: #4a5568; /* text-gray-700 */
      font-size: 0.9rem;
    }

    .page-paragraph {
      margin-bottom: 1rem;
      color: #4a5568; /* text-gray-700 */
      line-height: 1.6;
    }
    
    .page-list {
      list-style-type: disc;
      list-style-position: inside;
      margin-left: 1rem; /* ml-4 */
      margin-top: 0.5rem; /* my-2 */
      margin-bottom: 0.5rem; /* my-2 */
      padding-left: 0;
    }
    .page-list li {
        margin-bottom: 0.25rem;
    }

    /* Accordion Styles */
    .accordion-item {
      border-bottom: 1px solid #e2e8f0; /* border-b border-gray-200 */
    }
    .accordion-item:last-child {
      border-bottom: none; /* last:border-b-0 */
    }

    .accordion-button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 1rem 0.5rem; /* py-4 px-2 */
      text-align: left;
      color: #2d3748; /* text-gray-700 */
      background-color: transparent;
      border: none;
      cursor: pointer;
      font-size: 1rem;
    }
    .accordion-button:hover {
      background-color: #f7fafc; /* hover:bg-gray-100 */
    }
    .accordion-button:focus {
      outline: none;
      box-shadow: 0 0 0 2px #a3bffa; /* focus:ring-2 focus:ring-indigo-300 */
      border-radius: 0.375rem; /* rounded-md */
    }

    .accordion-title {
      font-weight: 500; /* font-medium */
    }

    .accordion-icon {
      transition: transform 0.3s ease; /* transition-transform duration-300 */
      width: 1.25rem; /* w-5 */
      height: 1.25rem; /* h-5 */
    }
    .accordion-icon.open {
      transform: rotate(180deg); /* rotate-180 */
    }

    .accordion-content {
      padding: 1rem; /* p-4 */
      background-color: #f9fafb; /* bg-gray-50 */
      color: #4a5568; /* text-gray-600 */
      border-top: 1px solid #e2e8f0;
    }
    .accordion-content p, .accordion-content ul {
        margin-bottom: 0.75rem;
    }
    .accordion-content ul {
        padding-left: 1.25rem;
    }
    .accordion-content p:last-child, .accordion-content ul:last-child {
        margin-bottom: 0;
    }

    /* Contact Us Page Specific Styles */
    .contact-intro {
        margin-bottom: 1.5rem; /* mb-6 */
        color: #4a5568; /* text-gray-700 */
        line-height: 1.6;
    }
    .contact-section-wrapper {
        /* space-y-6 handled by margin on contact-section */
    }
    .contact-section {
        background-color: #ffffff; /* bg-white */
        padding: 1.5rem; /* p-6 */
        border-radius: 0.375rem; /* rounded-lg */
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06); /* shadow-md */
        transition: box-shadow 0.3s ease; /* transition-shadow */
        margin-bottom: 1.5rem; /* for space-y-6 effect */
    }
    .contact-section:last-child {
        margin-bottom: 0;
    }
    .contact-section:hover {
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06); /* hover:shadow-lg */
    }
    .contact-section-title {
        font-size: 1.25rem; /* text-xl */
        font-weight: 600; /* font-semibold */
        margin-bottom: 0.75rem; /* mb-3 */
        color: #1a202c; /* text-gray-800 */
        display: flex;
        align-items: center;
    }
    .contact-section-text {
        color: #4a5568; /* text-gray-600 */
        margin-bottom: 0.5rem; /* mb-2 */
        line-height: 1.6;
    }
    .contact-link {
        color: #4f46e5; /* text-indigo-600 */
        font-weight: 500; /* font-medium */
        text-decoration: none;
    }
    .contact-link:hover {
        color: #3730a3; /* hover:text-indigo-800 */
        text-decoration: underline;
    }
    .contact-note {
        color: #718096; /* text-gray-500 */
        font-size: 0.875rem; /* text-sm */
    }

    /* Icon Styles */
    .icon {
      display: inline-block;
      vertical-align: middle;
    }
    .icon-sm { /* For ChevronDownIcon */
        width: 1.25rem; 
        height: 1.25rem;
    }
    .icon-md { /* For Phone, Email, Location */
        width: 1.5rem; 
        height: 1.5rem;
        margin-right: 0.5rem; /* mr-2 */
    }
    .icon-green { color: #10b981; } /* text-green-600 */
    .icon-blue { color: #2563eb; } /* text-blue-600 */
    .icon-red { color: #dc2626; } /* text-red-600 */

  `}</style>
)

// --- Icon Components (using inline SVG for simplicity, classes for sizing/color) ---
const ChevronDownIcon = ({className}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={`icon icon-sm ${className || ''}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
    />
  </svg>
)

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="icon icon-md icon-green"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
    />
  </svg>
)

const EmailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="icon icon-md icon-blue"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
    />
  </svg>
)

const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="icon icon-md icon-red"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
    />
  </svg>
)

// --- AccordionItem Component ---
const AccordionItem = ({title, children}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="accordion-item">
      <button
        className="accordion-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="accordion-title">{title}</span>
        <ChevronDownIcon className={`accordion-icon ${isOpen ? 'open' : ''}`} />
      </button>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  )
}

// --- PrivacyPolicy Component ---
const PrivacyPolicy = () => (
  <div className="page-container">
    <h1 className="page-title">Privacy Policy</h1>
    <p className="page-last-updated">
      Last updated: {new Date().toLocaleDateString()}
    </p>

    <AccordionItem title="1. Information We Collect">
      <p className="page-paragraph">
        We collect information you provide directly to us, such as when you
        create an account, place an order, or contact customer support. This may
        include:
      </p>
      <ul className="page-list">
        <li>
          Personal identification information (Name, email address, phone
          number, etc.)
        </li>
        <li>Delivery address information</li>
        <li>
          Payment information (processed securely by our payment partners)
        </li>
        <li>Order details</li>
      </ul>
      <p className="page-paragraph">
        We also collect information automatically when you use our services,
        such as IP address, device type, and browsing activity.
      </p>
    </AccordionItem>

    <AccordionItem title="2. How We Use Your Information">
      <p className="page-paragraph">We use your information to:</p>
      <ul className="page-list">
        <li>Provide, maintain, and improve our services</li>
        <li>Process your transactions and deliver your orders</li>
        <li>
          Communicate with you about your orders, new products, services, and
          promotional offers
        </li>
        <li>Personalize your experience on our app</li>
        <li>Detect and prevent fraud and abuse</li>
      </ul>
    </AccordionItem>

    <AccordionItem title="3. Information Sharing">
      <p className="page-paragraph">We may share your information with:</p>
      <ul className="page-list">
        <li>Restaurants and delivery partners to fulfill your orders</li>
        <li>
          Third-party service providers for payment processing, data analysis,
          and marketing
        </li>
        <li>Law enforcement or government authorities if required by law</li>
      </ul>
      <p className="page-paragraph">
        We do not sell your personal information to third parties.
      </p>
    </AccordionItem>

    <AccordionItem title="4. Data Security">
      <p className="page-paragraph">
        We implement reasonable security measures to protect your information
        from unauthorized access, use, or disclosure. However, no method of
        transmission over the internet or electronic storage is 100% secure.
      </p>
    </AccordionItem>

    <AccordionItem title="5. Your Choices">
      <p className="page-paragraph">
        You can access and update your account information at any time. You may
        also opt-out of receiving promotional emails by following the
        unsubscribe instructions in those emails.
      </p>
    </AccordionItem>

    <AccordionItem title="6. Cookies and Tracking Technologies">
      <p className="page-paragraph">
        We use cookies and similar tracking technologies to track the activity
        on our Service and hold certain information. Cookies are files with a
        small amount of data which may include an anonymous unique identifier.
        You can instruct your browser to refuse all cookies or to indicate when
        a cookie is being sent. However, if you do not accept cookies, you may
        not be able to use some portions of our Service.
      </p>
    </AccordionItem>

    <AccordionItem title="7. Children's Privacy">
      <p className="page-paragraph">
        Our Service does not address anyone under the age of 13
        (&quot;Children&quot;). We do not knowingly collect personally
        identifiable information from anyone under the age of 13. If you are a
        parent or guardian and you are aware that your Children has provided us
        with Personal Data, please contact us. If we become aware that we have
        collected Personal Data from children without verification of parental
        consent, we take steps to remove that information from our servers.
      </p>
    </AccordionItem>

    <AccordionItem title="8. Changes to This Privacy Policy">
      <p className="page-paragraph">
        We may update this Privacy Policy from time to time. We will notify you
        of any changes by posting the new Privacy Policy on this page. You are
        advised to review this Privacy Policy periodically for any changes.
      </p>
    </AccordionItem>

    <AccordionItem title="9. Contact Us">
      <p className="page-paragraph">
        If you have any questions about this Privacy Policy, please contact us
        through the methods provided in our 'Contact Us' section.
      </p>
    </AccordionItem>
  </div>
)

// --- TermsAndConditions Component ---
const TermsAndConditions = () => (
  <div className="page-container">
    <h1 className="page-title">Terms and Conditions</h1>
    <p className="page-last-updated">
      Last updated: {new Date().toLocaleDateString()}
    </p>

    <AccordionItem title="1. Acceptance of Terms">
      <p className="page-paragraph">
        By accessing or using the [Your Food App Name] service (the "Service"),
        you agree to be bound by these Terms and Conditions ("Terms"). If you
        disagree with any part of the terms, then you may not access the
        Service.
      </p>
    </AccordionItem>

    <AccordionItem title="2. Service Description">
      <p className="page-paragraph">
        [Your Food App Name] provides an online platform that connects users
        with local restaurants to order food for delivery or pickup.
      </p>
    </AccordionItem>

    <AccordionItem title="3. User Accounts">
      <p className="page-paragraph">
        To use certain features of the Service, you may be required to create an
        account. You are responsible for maintaining the confidentiality of your
        account information and for all activities that occur under your
        account. You agree to notify us immediately of any unauthorized use of
        your account.
      </p>
    </AccordionItem>

    <AccordionItem title="4. Orders and Payments">
      <p className="page-paragraph">
        When you place an order through the Service, it constitutes an offer to
        purchase products from the selected restaurant. All orders are subject
        to acceptance by the restaurant. Payment must be made at the time of
        ordering through our accepted payment methods. Prices and availability
        of items are subject to change.
      </p>
    </AccordionItem>

    <AccordionItem title="5. Cancellations and Refunds">
      <p className="page-paragraph">
        Please refer to our "Cancellation and Refund Policy" for details on
        order cancellations and refunds.
      </p>
    </AccordionItem>

    <AccordionItem title="6. User Conduct">
      <p className="page-paragraph">
        You agree not to use the Service for any unlawful purpose or in any way
        that could damage, disable, overburden, or impair the Service. You agree
        not to attempt to gain unauthorized access to any part of the Service or
        to any other user's account.
      </p>
    </AccordionItem>

    <AccordionItem title="7. Intellectual Property">
      <p className="page-paragraph">
        All content and materials available on the Service, including but not
        limited to text, graphics, website name, code, images, and logos are the
        intellectual property of [Your Food App Name] or its licensors and are
        protected by applicable copyright and trademark law.
      </p>
    </AccordionItem>

    <AccordionItem title="8. Disclaimer of Warranties">
      <p className="page-paragraph">
        The Service is provided "as is" and "as available" without any
        warranties of any kind, express or implied. We do not warrant that the
        Service will be uninterrupted, error-free, or free of viruses or other
        harmful components.
      </p>
    </AccordionItem>

    <AccordionItem title="9. Limitation of Liability">
      <p className="page-paragraph">
        In no event shall [Your Food App Name], nor its directors, employees,
        partners, agents, suppliers, or affiliates, be liable for any indirect,
        incidental, special, consequential or punitive damages, including
        without limitation, loss of profits, data, use, goodwill, or other
        intangible losses, resulting from your access to or use of or inability
        to access or use the Service.
      </p>
    </AccordionItem>

    <AccordionItem title="10. Governing Law">
      <p className="page-paragraph">
        These Terms shall be governed and construed in accordance with the laws
        of [Your Jurisdiction, e.g., India], without regard to its conflict of
        law provisions.
      </p>
    </AccordionItem>

    <AccordionItem title="11. Changes to Terms">
      <p className="page-paragraph">
        We reserve the right, at our sole discretion, to modify or replace these
        Terms at any time. If a revision is material, we will try to provide at
        least 30 days' notice prior to any new terms taking effect. What
        constitutes a material change will be determined at our sole discretion.
      </p>
    </AccordionItem>

    <AccordionItem title="12. Contact Us">
      <p className="page-paragraph">
        If you have any questions about these Terms, please contact us through
        the methods provided in our 'Contact Us' section.
      </p>
    </AccordionItem>
  </div>
)

// --- CancellationAndRefund Component ---
const CancellationAndRefund = () => (
  <div className="page-container">
    <h1 className="page-title">Cancellation and Refund Policy</h1>
    <p className="page-last-updated">
      Last updated: {new Date().toLocaleDateString()}
    </p>

    <AccordionItem title="1. Order Cancellation by Customer">
      <p className="page-paragraph">
        You may be able to cancel your order within a short period after placing
        it, provided the restaurant has not yet started preparing your food.
        Cancellation eligibility and any applicable fees will be indicated at
        the time of cancellation.
      </p>
      <p className="page-paragraph">
        To cancel an order, please go to your order history in the app or
        contact our customer support immediately.
      </p>
    </AccordionItem>

    <AccordionItem title="2. Order Cancellation by Restaurant or [Your Food App Name]">
      <p className="page-paragraph">
        In certain circumstances, the restaurant or [Your Food App Name] may
        need to cancel your order. This could be due to reasons such as:
      </p>
      <ul className="page-list">
        <li>Item unavailability</li>
        <li>Restaurant being unable to fulfill the order</li>
        <li>Delivery issues</li>
        <li>Suspicion of fraudulent activity</li>
      </ul>
      <p className="page-paragraph">
        If your order is cancelled by us or the restaurant, you will be
        notified, and a full refund will be processed to your original payment
        method.
      </p>
    </AccordionItem>

    <AccordionItem title="3. Refund Policy">
      <p className="page-paragraph">
        Refunds are processed under the following conditions:
      </p>
      <ul className="page-list">
        <li>Eligible order cancellations (as per section 1 and 2).</li>
        <li>Incorrect order delivered (e.g., wrong items).</li>
        <li>
          Damaged or spoiled food items (requires proof, such as photographs).
        </li>
        <li>
          Non-delivery of order after the estimated delivery time, where fault
          is not attributable to the customer.
        </li>
      </ul>
      <p className="page-paragraph">
        To request a refund, please contact our customer support within [e.g.,
        24 hours] of your order delivery or expected delivery time, providing
        your order details and the reason for the refund request. We may require
        photographic evidence or other information to process your request.
      </p>
    </AccordionItem>

    <AccordionItem title="4. Refund Processing Time">
      <p className="page-paragraph">
        Once a refund is approved, it will typically be processed within [e.g.,
        5-7 business days] to your original method of payment. The exact time
        may vary depending on your bank or payment provider.
      </p>
    </AccordionItem>

    <AccordionItem title="5. Non-Refundable Situations">
      <p className="page-paragraph">
        Refunds may not be provided in situations such as:
      </p>
      <ul className="page-list">
        <li>Customer provided incorrect delivery address.</li>
        <li>
          Customer was unavailable to receive the order at the time of delivery.
        </li>
        <li>Change of mind after the order has been prepared or dispatched.</li>
        <li>Minor variations in food preparation or taste preference.</li>
      </ul>
    </AccordionItem>
    <AccordionItem title="6. Contact for Cancellations/Refunds">
      <p className="page-paragraph">
        For any cancellation or refund queries, please reach out to our customer
        support via the 'Contact Us' section in the app or website.
      </p>
    </AccordionItem>
  </div>
)

// --- ShippingAndDelivery Component ---
const ShippingAndDelivery = () => (
  <div className="page-container">
    <h1 className="page-title">Shipping and Delivery Policy</h1>
    <p className="page-last-updated">
      Last updated: {new Date().toLocaleDateString()}
    </p>

    <AccordionItem title="1. Delivery Areas">
      <p className="page-paragraph">
        We deliver to select areas. You can check if we deliver to your location
        by entering your address or pincode in the app before placing an order.
        We are constantly expanding our delivery zones.
      </p>
    </AccordionItem>

    <AccordionItem title="2. Delivery Time">
      <p className="page-paragraph">
        Estimated delivery times are provided when you place an order. These are
        estimates and can vary based on factors such as:
      </p>
      <ul className="page-list">
        <li>Restaurant preparation time</li>
        <li>Traffic conditions</li>
        <li>Weather conditions</li>
        <li>Order volume</li>
        <li>Distance from the restaurant to your location</li>
      </ul>
      <p className="page-paragraph">
        We strive to deliver your order as quickly as possible and will keep you
        updated on its status through the app.
      </p>
    </AccordionItem>

    <AccordionItem title="3. Delivery Charges">
      <p className="page-paragraph">
        Delivery charges may apply to your order. The applicable delivery fee
        will be displayed at checkout before you confirm your order. Fees can
        vary based on distance, order value, and active promotions.
      </p>
    </AccordionItem>

    <AccordionItem title="4. Order Tracking">
      <p className="page-paragraph">
        Once your order is confirmed and out for delivery, you can track its
        real-time status through the app. You will see the delivery partner's
        location and estimated time of arrival.
      </p>
    </AccordionItem>

    <AccordionItem title="5. Receiving Your Order">
      <p className="page-paragraph">
        Please ensure someone is available at the delivery address to receive
        the order. If our delivery partner is unable to reach you after
        reasonable attempts, your order may be cancelled, and you may not be
        eligible for a refund (refer to our Cancellation and Refund Policy).
      </p>
      <p className="page-paragraph">
        For contactless delivery, please specify this in the delivery
        instructions. Our delivery partner will leave the order at your doorstep
        and notify you.
      </p>
    </AccordionItem>

    <AccordionItem title="6. Issues with Delivery">
      <p className="page-paragraph">
        If you experience any issues with your delivery, such as significant
        delays, wrong items, or damaged goods, please contact our customer
        support immediately through the app. We will do our best to resolve the
        issue promptly.
      </p>
    </AccordionItem>

    <AccordionItem title="7. Bulk Orders or Special Requests">
      <p className="page-paragraph">
        For bulk orders or special delivery requests, please contact our
        customer support in advance to make arrangements. Additional charges or
        specific terms may apply.
      </p>
    </AccordionItem>
  </div>
)

// --- ContactUs Component ---
const ContactUs = () => (
  <div className="page-container">
    <h1 className="page-title">Contact Us</h1>
    <p className="contact-intro">
      We're here to help! If you have any questions, concerns, or feedback,
      please don't hesitate to get in touch with us through any of the following
      channels:
    </p>

    <div className="contact-section-wrapper">
      <div className="contact-section">
        <h2 className="contact-section-title">Customer Support (In-App)</h2>
        <p className="contact-section-text">
          For the quickest response regarding your orders, payments, or
          app-related issues, please use the in-app support chat feature.
        </p>
        <p className="contact-section-text">
          Navigate to 'Help' or 'Support' section in your Tastykitchens app.
        </p>
      </div>

      <div className="contact-section">
        <h2 className="contact-section-title">
          <EmailIcon /> Email Support
        </h2>
        <p className="contact-section-text">
          For general inquiries, partnership opportunities, or issues not
          resolved through in-app chat:
        </p>
        <a href="mailto:support@yourfoodapp.com" className="contact-link">
          support@tastykitchens.com
        </a>
        <p className="contact-section-text" style={{marginTop: '0.25rem'}}>
          We aim to respond within 24-48 business hours.
        </p>
      </div>

      <div className="contact-section">
        <h2 className="contact-section-title">
          <PhoneIcon /> Phone Support (If Applicable)
        </h2>
        <p className="contact-section-text">
          If phone support is available, the number will be listed here:
        </p>
        <p className="contact-section-text" style={{fontWeight: '500'}}>
          [Your Customer Support Phone Number - e.g., +91-9109603206]
        </p>
        <p className="contact-note">
          (Please note: Phone support hours may vary)
        </p>
      </div>

      <div className="contact-section">
        <h2 className="contact-section-title">
          <LocationIcon /> Mailing Address / Registered Office
        </h2>
        <p className="contact-section-text">[Your Company Name]</p>
        <p className="contact-section-text">
          [Your Registered Office Address Line 1]
        </p>
        <p className="contact-section-text">[Address Line 2, City, Pincode]</p>
        <p className="contact-section-text">[State, Country]</p>
      </div>

      <div className="contact-section">
        <h2 className="contact-section-title">Feedback</h2>
        <p className="contact-section-text">
          We value your feedback! If you have suggestions on how we can improve
          our service, please let us know via email or the in-app feedback
          option.
        </p>
      </div>
    </div>
  </div>
)

// --- Main App Component ---
function AppPrivacyPolicy() {
  const [currentPage, setCurrentPage] = useState('privacy') // Default page

  const renderPage = () => {
    switch (currentPage) {
      case 'privacy':
        return <PrivacyPolicy />
      case 'terms':
        return <TermsAndConditions />
      case 'cancellation':
        return <CancellationAndRefund />
      case 'shipping':
        return <ShippingAndDelivery />
      case 'contact':
        return <ContactUs />
      default:
        return <PrivacyPolicy />
    }
  }

  const navItems = [
    {id: 'privacy', label: 'Privacy Policy'},
    {id: 'terms', label: 'Terms & Conditions'},
    {id: 'cancellation', label: 'Cancellation & Refund'},
    {id: 'shipping', label: 'Shipping & Delivery'},
    {id: 'contact', label: 'Contact Us'},
  ]

  return (
    <>
      <GlobalStyles /> {/* Component to inject styles */}
      <div className="app-container">
        <header className="app-header">
          <nav className="container">
            {' '}
            {/* Use .container for nav content centering */}
            <ul className="header-nav-list">
              {navItems.map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => setCurrentPage(item.id)}
                    className={`nav-button ${
                      currentPage === item.id ? 'nav-button-active' : ''
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <main className="app-main container">
          {' '}
          {/* Use .container for main content centering */}
          <div className="main-content-wrapper">{renderPage()}</div>
        </main>

        <footer className="app-footer">
          <p>
            &copy; {new Date().getFullYear()} Tastykitchens. All rights
            reserved.
          </p>
          <p>Tastykitchens</p>
        </footer>
      </div>
    </>
  )
}

export default AppPrivacyPolicy

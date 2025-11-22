export const locales = ['en', 'hi']
export const defaultLocale = 'en'

const dictionaries = {
  en: {
    dashboard: 'Dashboard',
    operations: 'Operations',
    receipts: 'Receipts',
    delivery: 'Delivery',
    adjustments: 'Adjustments',
    stock: 'Stock',
    moveHistory: 'Move History',
    settings: 'Settings',
    notifications: 'Notifications',
    language: 'Language',
    loginTitle: 'Login Page',
    loginSubtitle: 'Sign in to your account to continue',
    emailLabel: 'Login Id',
    passwordLabel: 'Password',
    signIn: 'Sign In',
    signupTitle: 'Sign up Page',
    signupSubtitle: 'Create an account to get started',
    nameLabel: 'Enter Login Id',
    confirmPasswordLabel: 'Re-Enter Password',
    signUp: 'Sign Up',
    newProduct: 'New Product',
    searchPlaceholder: 'Search Product Name or SKU...',
    allCategories: 'All Categories',
    reset: 'Reset',
    currentStockTitle: 'Current Stock',
    currentStockSubtitle: 'Manage inventory levels, unit costs, and availability across warehouses.',
    totalValue: 'Total Value',
    lowStockItems: 'Low Stock',
    create: 'Create',
    creating: 'Creating...',
    cancel: 'Cancel',
    update: 'Update',
  },
  hi: {
    dashboard: 'डैशबोर्ड',
    operations: 'ऑपरेशन्स',
    receipts: 'रसीदें',
    delivery: 'डिलीवरी',
    adjustments: 'समायोजन',
    stock: 'स्टॉक',
    moveHistory: 'मूव इतिहास',
    settings: 'सेटिंग्स',
    notifications: 'सूचनाएँ',
    language: 'भाषा',
    loginTitle: 'लॉगिन पेज',
    loginSubtitle: 'जारी रखने के लिए अपने खाते में साइन इन करें',
    emailLabel: 'लॉगिन आईडी',
    passwordLabel: 'पासवर्ड',
    signIn: 'साइन इन',
    signupTitle: 'साइन अप पेज',
    signupSubtitle: 'आरंभ करने के लिए एक खाता बनाएँ',
    nameLabel: 'लॉगिन आईडी दर्ज करें',
    confirmPasswordLabel: 'पासवर्ड फिर से दर्ज करें',
    signUp: 'साइन अप',
    newProduct: 'नया उत्पाद',
    searchPlaceholder: 'उत्पाद नाम या SKU खोजें...',
    allCategories: 'सभी श्रेणियाँ',
    reset: 'रीसेट',
    currentStockTitle: 'वर्तमान स्टॉक',
    currentStockSubtitle: 'इन्वेंटरी स्तर, यूनिट लागत और उपलब्धता प्रबंधित करें।',
    totalValue: 'कुल मूल्य',
    lowStockItems: 'कम स्टॉक',
    create: 'बनाएँ',
    creating: 'बनाया जा रहा...',
    cancel: 'रद्द करें',
    update: 'अपडेट',
  }
}

export function translate(key, locale) {
  const dict = dictionaries[locale] || dictionaries[defaultLocale]
  return dict[key] || dictionaries[defaultLocale][key] || key
}

export function getDictionary(locale) {
  return dictionaries[locale] || dictionaries[defaultLocale]
}

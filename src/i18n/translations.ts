export type Language = "en" | "ar" | "es" | "fr" | "de" | "tr" | "zh" | "ja" | "ru" | "hi" | "ko" | "pt" | "it" | "nl";

export const languageNames: Record<Language, string> = {
  en: "English",
  ar: "العربية",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  tr: "Türkçe",
  zh: "中文",
  ja: "日本語",
  ru: "Русский",
  hi: "हिन्दी",
  ko: "한국어",
  pt: "Português",
  it: "Italiano",
  nl: "Nederlands",
};

export const rtlLanguages: Language[] = ["ar"];

type TranslationKeys = {
  // Navbar
  nav_home: string;
  nav_search: string;
  nav_categories: string;
  nav_generate: string;
  nav_shop: string;
  nav_recipes: string;
  nav_favorites: string;
  nav_add_recipe: string;
  nav_profile: string;
  nav_sign_in: string;

  // Home
  home_hero_title: string;
  home_hero_title_accent: string;
  home_hero_desc: string;
  home_search_placeholder: string;
  home_generate_ai: string;
  home_featured: string;
  home_featured_desc: string;
  home_loading: string;
  home_no_recipes: string;
  home_first_recipe: string;

  // Footer
  footer_desc: string;
  footer_explore: string;
  footer_search_recipes: string;
  footer_resources: string;
  footer_cooking_guides: string;
  footer_about: string;
  footer_contact: string;
  footer_account: string;
  footer_my_favorites: string;
  footer_shopping_lists: string;
  footer_profile: string;
  footer_copyright: string;

  // Generate Recipe
  gen_title: string;
  gen_desc: string;
  gen_what_cook: string;
  gen_what_cook_placeholder: string;
  gen_cuisine: string;
  gen_ingredients: string;
  gen_add_ingredient_placeholder: string;
  gen_add: string;
  gen_dietary: string;
  gen_category: string;
  gen_generating: string;
  gen_generate: string;

  // Search
  search_title: string;
  search_placeholder: string;
  search_searching: string;
  search_found: string;
  search_recipe: string;
  search_recipes: string;
  search_no_results: string;

  // Favorites
  fav_title: string;
  fav_loading: string;
  fav_empty: string;
  fav_empty_desc: string;

  // Categories
  cat_title: string;
  cat_desc: string;
  cat_search_placeholder: string;
  cat_loading: string;
  cat_no_results: string;
  cat_recipes: string;
  cat_loading_recipes: string;
  cat_no_recipes: string;
  cat_be_first: string;

  // Recipe Detail
  detail_back: string;
  detail_save: string;
  detail_saved: string;
  detail_add_to_list: string;
  detail_ingredients: string;
  detail_instructions: string;
  detail_more_recipes: string;
  detail_loading: string;
  detail_servings: string;
  detail_min: string;

  // My Recipes
  recipes_title: string;
  recipes_desc: string;
  recipes_search: string;
  recipes_no_found: string;
  recipes_no_yet: string;
  recipes_adjust_search: string;
  recipes_start_creating: string;
  recipes_create_first: string;
  recipes_edit: string;
  recipes_delete: string;
  recipes_delete_title: string;
  recipes_delete_desc: string;
  recipes_cancel: string;

  // Edit Recipe
  edit_title: string;
  edit_recipe_title: string;
  edit_description: string;
  edit_category: string;
  edit_cuisine: string;
  edit_difficulty: string;
  edit_prep_time: string;
  edit_cook_time: string;
  edit_servings: string;
  edit_dietary: string;
  edit_ingredients: string;
  edit_add_ingredient: string;
  edit_instructions: string;
  edit_add_step: string;
  edit_saving: string;
  edit_save: string;
  edit_cancel: string;
  edit_amount: string;
  edit_ingredient: string;
  edit_step_placeholder: string;

  // Profile
  profile_title: string;
  profile_account_info: string;
  profile_email: string;
  profile_display_name: string;
  profile_name_placeholder: string;
  profile_updating: string;
  profile_update: string;
  profile_actions: string;
  profile_sign_out: string;
  profile_loading: string;

  // Auth
  auth_reset_password: string;
  auth_welcome_back: string;
  auth_create_account: string;
  auth_reset_desc: string;
  auth_sign_in_desc: string;
  auth_sign_up_desc: string;
  auth_display_name: string;
  auth_email: string;
  auth_password: string;
  auth_forgot: string;
  auth_loading: string;
  auth_send_reset: string;
  auth_sign_in: string;
  auth_or_continue: string;
  auth_back_sign_in: string;
  auth_no_account: string;
  auth_has_account: string;

  // About
  about_title: string;
  about_subtitle: string;
  about_mission: string;
  about_mission_p1: string;
  about_mission_p2: string;
  about_features: string;
  about_tech: string;
  about_tech_desc: string;
  about_f1_title: string;
  about_f1_desc: string;
  about_f2_title: string;
  about_f2_desc: string;
  about_f3_title: string;
  about_f3_desc: string;
  about_f4_title: string;
  about_f4_desc: string;

  // Contact
  contact_title: string;
  contact_subtitle: string;
  contact_email_title: string;
  contact_email_desc: string;
  contact_feedback_title: string;
  contact_feedback_desc: string;
  contact_send_message: string;
  contact_name: string;
  contact_name_placeholder: string;
  contact_email: string;
  contact_subject: string;
  contact_subject_placeholder: string;
  contact_message: string;
  contact_message_placeholder: string;
  contact_sending: string;
  contact_send: string;

  // Shop
  shop_badge: string;
  shop_title1: string;
  shop_title2: string;
  shop_desc: string;
  shop_quality: string;
  shop_top_rated: string;
  shop_fast_delivery: string;
  shop_collection: string;
  shop_collection_desc: string;
  shop_now: string;
  shop_trending: string;
  shop_why: string;
  shop_why_desc: string;

  // Resources
  res_title: string;
  res_subtitle: string;
  res_cooking_tips: string;
  res_kitchen_tools: string;
  res_tools_desc: string;
  res_pantry: string;
  res_pantry_desc: string;
  res_conversions: string;
  res_conversions_desc: string;

  // NotFound
  notfound_title: string;
  notfound_desc: string;
  notfound_home: string;

  // Common
  common_servings: string;
};

const en: TranslationKeys = {
  nav_home: "Home",
  nav_search: "Search",
  nav_categories: "Categories",
  nav_generate: "Generate",
  nav_shop: "Shop",
  nav_recipes: "Recipes",
  nav_favorites: "Favorites",
  nav_add_recipe: "Add Recipe",
  nav_profile: "Profile",
  nav_sign_in: "Sign In",

  home_hero_title: "Discover Your Next",
  home_hero_title_accent: "Culinary Adventure",
  home_hero_desc: "AI-powered recipe generation tailored to your taste, dietary preferences, and available ingredients",
  home_search_placeholder: "Search recipes or describe what you want to cook...",
  home_generate_ai: "Generate AI Recipe",
  home_featured: "Featured Recipes",
  home_featured_desc: "Explore our collection of AI-generated culinary delights",
  home_loading: "Loading delicious recipes...",
  home_no_recipes: "No recipes yet. Be the first to create one!",
  home_first_recipe: "Generate Your First Recipe",

  footer_desc: "AI-powered recipe discovery and generation for home cooks everywhere.",
  footer_explore: "Explore",
  footer_search_recipes: "Search Recipes",
  footer_resources: "Resources",
  footer_cooking_guides: "Cooking Guides",
  footer_about: "About Us",
  footer_contact: "Contact",
  footer_account: "Account",
  footer_my_favorites: "My Favorites",
  footer_shopping_lists: "Shopping Lists",
  footer_profile: "Profile",
  footer_copyright: "FlavorAI. All rights reserved. Powered by AI.",

  gen_title: "Generate AI Recipe",
  gen_desc: "Describe what you want to cook and let AI create a custom recipe",
  gen_what_cook: "What would you like to cook?",
  gen_what_cook_placeholder: "E.g., A spicy pasta dish, Healthy breakfast bowl, Chocolate dessert...",
  gen_cuisine: "Cuisine Type (Optional)",
  gen_ingredients: "Available Ingredients (Optional)",
  gen_add_ingredient_placeholder: "Add an ingredient...",
  gen_add: "Add",
  gen_dietary: "Dietary Preferences (Optional)",
  gen_category: "Recipe Category *",
  gen_generating: "Generating Recipe...",
  gen_generate: "Generate Recipe",

  search_title: "Search Recipes",
  search_placeholder: "Search by name, cuisine, or ingredients...",
  search_searching: "Searching recipes...",
  search_found: "Found",
  search_recipe: "recipe",
  search_recipes: "recipes",
  search_no_results: "No recipes found for",

  fav_title: "My Favorite Recipes",
  fav_loading: "Loading your favorites...",
  fav_empty: "No favorite recipes yet",
  fav_empty_desc: "Start exploring recipes and save your favorites!",

  cat_title: "Browse Recipe Categories",
  cat_desc: "Explore our curated collection of recipes organized by category. Find the perfect dish for any occasion.",
  cat_search_placeholder: "Search categories...",
  cat_loading: "Loading categories...",
  cat_no_results: "No categories found matching",
  cat_recipes: "Recipes",
  cat_loading_recipes: "Loading recipes...",
  cat_no_recipes: "No recipes in this category yet.",
  cat_be_first: "Be the first to create one!",

  detail_back: "Back",
  detail_save: "Save",
  detail_saved: "Saved",
  detail_add_to_list: "Add to List",
  detail_ingredients: "Ingredients",
  detail_instructions: "Instructions",
  detail_more_recipes: "More Recipes",
  detail_loading: "Loading...",
  detail_servings: "servings",
  detail_min: "min",

  recipes_title: "My Recipes",
  recipes_desc: "Manage all your saved recipes in one place",
  recipes_search: "Search recipes...",
  recipes_no_found: "No recipes found",
  recipes_no_yet: "No recipes yet",
  recipes_adjust_search: "Try adjusting your search",
  recipes_start_creating: "Start creating delicious recipes!",
  recipes_create_first: "Create Your First Recipe",
  recipes_edit: "Edit",
  recipes_delete: "Delete",
  recipes_delete_title: "Delete Recipe",
  recipes_delete_desc: "Are you sure you want to delete this recipe? This action cannot be undone.",
  recipes_cancel: "Cancel",

  edit_title: "Edit Recipe",
  edit_recipe_title: "Recipe Title *",
  edit_description: "Description",
  edit_category: "Recipe Category",
  edit_cuisine: "Cuisine Type",
  edit_difficulty: "Difficulty",
  edit_prep_time: "Prep Time (minutes)",
  edit_cook_time: "Cook Time (minutes)",
  edit_servings: "Servings",
  edit_dietary: "Dietary Preferences",
  edit_ingredients: "Ingredients",
  edit_add_ingredient: "Add Ingredient",
  edit_instructions: "Instructions",
  edit_add_step: "Add Step",
  edit_saving: "Saving...",
  edit_save: "Save Changes",
  edit_cancel: "Cancel",
  edit_amount: "Amount",
  edit_ingredient: "Ingredient",
  edit_step_placeholder: "Describe this step",

  profile_title: "Profile",
  profile_account_info: "Account Information",
  profile_email: "Email",
  profile_display_name: "Display Name",
  profile_name_placeholder: "Your name",
  profile_updating: "Updating...",
  profile_update: "Update Profile",
  profile_actions: "Account Actions",
  profile_sign_out: "Sign Out",
  profile_loading: "Loading...",

  auth_reset_password: "Reset Password",
  auth_welcome_back: "Welcome Back",
  auth_create_account: "Create Account",
  auth_reset_desc: "Enter your email to receive a password reset link",
  auth_sign_in_desc: "Sign in to access your saved recipes",
  auth_sign_up_desc: "Join FlavorAI and start discovering amazing recipes",
  auth_display_name: "Display Name",
  auth_email: "Email",
  auth_password: "Password",
  auth_forgot: "Forgot password?",
  auth_loading: "Loading...",
  auth_send_reset: "Send Reset Link",
  auth_sign_in: "Sign In",
  auth_or_continue: "Or continue with",
  auth_back_sign_in: "Back to sign in",
  auth_no_account: "Don't have an account? Sign up",
  auth_has_account: "Already have an account? Sign in",

  about_title: "About FlavorAI",
  about_subtitle: "Revolutionizing home cooking with AI-powered recipe generation",
  about_mission: "Our Mission",
  about_mission_p1: "FlavorAI was created to make cooking more accessible, creative, and enjoyable for everyone. Whether you're a seasoned chef or just starting your culinary journey, our AI-powered platform helps you discover new recipes tailored to your unique preferences.",
  about_mission_p2: "We believe that great cooking should be accessible to everyone, regardless of experience level or available ingredients. That's why we've built a platform that combines the power of artificial intelligence with the art of cooking.",
  about_features: "Key Features",
  about_tech: "Technology Stack",
  about_tech_desc: "FlavorAI is built with cutting-edge technology to provide the best experience:",
  about_f1_title: "AI-Powered Recipe Generation",
  about_f1_desc: "Leveraging advanced AI to create unique, personalized recipes based on your preferences.",
  about_f2_title: "Beautiful Visual Generation",
  about_f2_desc: "Each recipe comes with an AI-generated image giving you a visual preview.",
  about_f3_title: "Instant Results",
  about_f3_desc: "Get complete recipes with ingredients and instructions in seconds.",
  about_f4_title: "Secure & Private",
  about_f4_desc: "Your data is protected ensuring your recipes and preferences stay safe.",

  contact_title: "Contact Us",
  contact_subtitle: "Have questions or feedback? We'd love to hear from you!",
  contact_email_title: "Email Us",
  contact_email_desc: "For general inquiries and support",
  contact_feedback_title: "Feedback",
  contact_feedback_desc: "Share your ideas and suggestions",
  contact_send_message: "Send us a Message",
  contact_name: "Name",
  contact_name_placeholder: "Your name",
  contact_email: "Email",
  contact_subject: "Subject",
  contact_subject_placeholder: "What's this about?",
  contact_message: "Message",
  contact_message_placeholder: "Tell us more...",
  contact_sending: "Sending...",
  contact_send: "Send Message",

  shop_badge: "Curated Kitchen Essentials",
  shop_title1: "Premium Kitchen Tools",
  shop_title2: "For Modern Cooking",
  shop_desc: "Discover the finest selection of kitchen essentials that transform your cooking experience",
  shop_quality: "Premium Quality",
  shop_top_rated: "Top Rated",
  shop_fast_delivery: "Fast Delivery",
  shop_collection: "Shop The Collection",
  shop_collection_desc: "Each product is carefully selected to meet the highest standards",
  shop_now: "Shop Now",
  shop_trending: "Trending",
  shop_why: "Why Shop With Us?",
  shop_why_desc: "Every product is carefully tested and approved by professional chefs and cooking enthusiasts.",

  res_title: "Cooking Resources",
  res_subtitle: "Essential guides and tips to elevate your culinary skills",
  res_cooking_tips: "Essential Cooking Tips",
  res_kitchen_tools: "Essential Kitchen Tools",
  res_tools_desc: "Fundamental tools every home cook should have:",
  res_pantry: "Pantry Essentials",
  res_pantry_desc: "Stock your pantry with these basics:",
  res_conversions: "Quick Conversion Guide",
  res_conversions_desc: "Common measurement conversions:",

  notfound_title: "Oops! Page not found",
  notfound_desc: "The page you're looking for doesn't exist or has been moved.",
  notfound_home: "Home",

  common_servings: "servings",
};

const ar: TranslationKeys = {
  nav_home: "الرئيسية",
  nav_search: "بحث",
  nav_categories: "التصنيفات",
  nav_generate: "إنشاء",
  nav_shop: "المتجر",
  nav_recipes: "الوصفات",
  nav_favorites: "المفضلة",
  nav_add_recipe: "إضافة وصفة",
  nav_profile: "الملف الشخصي",
  nav_sign_in: "تسجيل الدخول",

  home_hero_title: "اكتشف مغامرتك",
  home_hero_title_accent: "الطهي القادمة",
  home_hero_desc: "توليد وصفات مدعومة بالذكاء الاصطناعي مصممة حسب ذوقك وتفضيلاتك الغذائية والمكونات المتاحة",
  home_search_placeholder: "ابحث عن وصفات أو صف ما تريد طهيه...",
  home_generate_ai: "إنشاء وصفة بالذكاء الاصطناعي",
  home_featured: "الوصفات المميزة",
  home_featured_desc: "استكشف مجموعتنا من الأطباق المولدة بالذكاء الاصطناعي",
  home_loading: "جاري تحميل الوصفات اللذيذة...",
  home_no_recipes: "لا توجد وصفات بعد. كن أول من يُنشئ واحدة!",
  home_first_recipe: "أنشئ وصفتك الأولى",

  footer_desc: "اكتشاف وإنشاء وصفات مدعومة بالذكاء الاصطناعي للطهاة المنزليين في كل مكان.",
  footer_explore: "استكشاف",
  footer_search_recipes: "بحث الوصفات",
  footer_resources: "الموارد",
  footer_cooking_guides: "دليل الطبخ",
  footer_about: "عن الموقع",
  footer_contact: "اتصل بنا",
  footer_account: "الحساب",
  footer_my_favorites: "مفضلاتي",
  footer_shopping_lists: "قوائم التسوق",
  footer_profile: "الملف الشخصي",
  footer_copyright: "FlavorAI. جميع الحقوق محفوظة. مدعوم بالذكاء الاصطناعي.",

  gen_title: "إنشاء وصفة بالذكاء الاصطناعي",
  gen_desc: "صف ما تريد طهيه ودع الذكاء الاصطناعي يُنشئ وصفة مخصصة",
  gen_what_cook: "ماذا تريد أن تطبخ؟",
  gen_what_cook_placeholder: "مثلاً: طبق مكرونة حار، وعاء إفطار صحي، حلوى شوكولاتة...",
  gen_cuisine: "نوع المطبخ (اختياري)",
  gen_ingredients: "المكونات المتاحة (اختياري)",
  gen_add_ingredient_placeholder: "أضف مكون...",
  gen_add: "إضافة",
  gen_dietary: "التفضيلات الغذائية (اختياري)",
  gen_category: "تصنيف الوصفة *",
  gen_generating: "جاري إنشاء الوصفة...",
  gen_generate: "إنشاء الوصفة",

  search_title: "بحث الوصفات",
  search_placeholder: "ابحث بالاسم أو المطبخ أو المكونات...",
  search_searching: "جاري البحث...",
  search_found: "تم العثور على",
  search_recipe: "وصفة",
  search_recipes: "وصفات",
  search_no_results: "لم يتم العثور على وصفات لـ",

  fav_title: "وصفاتي المفضلة",
  fav_loading: "جاري تحميل المفضلة...",
  fav_empty: "لا توجد وصفات مفضلة بعد",
  fav_empty_desc: "ابدأ باستكشاف الوصفات واحفظ مفضلاتك!",

  cat_title: "تصفح تصنيفات الوصفات",
  cat_desc: "استكشف مجموعتنا المنسقة من الوصفات المنظمة حسب التصنيف. اعثر على الطبق المثالي لأي مناسبة.",
  cat_search_placeholder: "ابحث في التصنيفات...",
  cat_loading: "جاري تحميل التصنيفات...",
  cat_no_results: "لم يتم العثور على تصنيفات مطابقة لـ",
  cat_recipes: "الوصفات",
  cat_loading_recipes: "جاري تحميل الوصفات...",
  cat_no_recipes: "لا توجد وصفات في هذا التصنيف بعد.",
  cat_be_first: "كن أول من يُنشئ واحدة!",

  detail_back: "رجوع",
  detail_save: "حفظ",
  detail_saved: "محفوظة",
  detail_add_to_list: "أضف للقائمة",
  detail_ingredients: "المكونات",
  detail_instructions: "التعليمات",
  detail_more_recipes: "وصفات أخرى",
  detail_loading: "جاري التحميل...",
  detail_servings: "حصص",
  detail_min: "دقيقة",

  recipes_title: "وصفاتي",
  recipes_desc: "إدارة جميع وصفاتك المحفوظة في مكان واحد",
  recipes_search: "ابحث في الوصفات...",
  recipes_no_found: "لم يتم العثور على وصفات",
  recipes_no_yet: "لا توجد وصفات بعد",
  recipes_adjust_search: "حاول تعديل بحثك",
  recipes_start_creating: "ابدأ بإنشاء وصفات لذيذة!",
  recipes_create_first: "أنشئ وصفتك الأولى",
  recipes_edit: "تعديل",
  recipes_delete: "حذف",
  recipes_delete_title: "حذف الوصفة",
  recipes_delete_desc: "هل أنت متأكد أنك تريد حذف هذه الوصفة؟ لا يمكن التراجع عن هذا الإجراء.",
  recipes_cancel: "إلغاء",

  edit_title: "تعديل الوصفة",
  edit_recipe_title: "عنوان الوصفة *",
  edit_description: "الوصف",
  edit_category: "تصنيف الوصفة",
  edit_cuisine: "نوع المطبخ",
  edit_difficulty: "الصعوبة",
  edit_prep_time: "وقت التحضير (دقائق)",
  edit_cook_time: "وقت الطبخ (دقائق)",
  edit_servings: "الحصص",
  edit_dietary: "التفضيلات الغذائية",
  edit_ingredients: "المكونات",
  edit_add_ingredient: "إضافة مكون",
  edit_instructions: "التعليمات",
  edit_add_step: "إضافة خطوة",
  edit_saving: "جاري الحفظ...",
  edit_save: "حفظ التغييرات",
  edit_cancel: "إلغاء",
  edit_amount: "الكمية",
  edit_ingredient: "المكون",
  edit_step_placeholder: "وصف هذه الخطوة",

  profile_title: "الملف الشخصي",
  profile_account_info: "معلومات الحساب",
  profile_email: "البريد الإلكتروني",
  profile_display_name: "الاسم المعروض",
  profile_name_placeholder: "اسمك",
  profile_updating: "جاري التحديث...",
  profile_update: "تحديث الملف الشخصي",
  profile_actions: "إجراءات الحساب",
  profile_sign_out: "تسجيل الخروج",
  profile_loading: "جاري التحميل...",

  auth_reset_password: "إعادة تعيين كلمة المرور",
  auth_welcome_back: "مرحباً بعودتك",
  auth_create_account: "إنشاء حساب",
  auth_reset_desc: "أدخل بريدك الإلكتروني لتلقي رابط إعادة التعيين",
  auth_sign_in_desc: "سجل دخولك للوصول إلى وصفاتك المحفوظة",
  auth_sign_up_desc: "انضم إلى FlavorAI وابدأ باكتشاف وصفات مذهلة",
  auth_display_name: "الاسم المعروض",
  auth_email: "البريد الإلكتروني",
  auth_password: "كلمة المرور",
  auth_forgot: "نسيت كلمة المرور؟",
  auth_loading: "جاري التحميل...",
  auth_send_reset: "إرسال رابط التعيين",
  auth_sign_in: "تسجيل الدخول",
  auth_or_continue: "أو تابع مع",
  auth_back_sign_in: "العودة لتسجيل الدخول",
  auth_no_account: "ليس لديك حساب؟ سجل الآن",
  auth_has_account: "لديك حساب بالفعل؟ سجل الدخول",

  about_title: "عن FlavorAI",
  about_subtitle: "ثورة في الطبخ المنزلي بتوليد الوصفات المدعومة بالذكاء الاصطناعي",
  about_mission: "مهمتنا",
  about_mission_p1: "تم إنشاء FlavorAI لجعل الطبخ أكثر سهولة وإبداعاً ومتعة للجميع. سواء كنت طاهياً متمرساً أو بدأت للتو في رحلتك الطهوية، منصتنا المدعومة بالذكاء الاصطناعي تساعدك في اكتشاف وصفات جديدة مصممة لتفضيلاتك الفريدة.",
  about_mission_p2: "نؤمن بأن الطبخ الرائع يجب أن يكون متاحاً للجميع، بغض النظر عن مستوى الخبرة أو المكونات المتاحة. لهذا السبب بنينا منصة تجمع بين قوة الذكاء الاصطناعي وفن الطبخ.",
  about_features: "الميزات الرئيسية",
  about_tech: "التقنيات المستخدمة",
  about_tech_desc: "تم بناء FlavorAI بتقنيات متطورة لتوفير أفضل تجربة:",
  about_f1_title: "توليد وصفات بالذكاء الاصطناعي",
  about_f1_desc: "استخدام ذكاء اصطناعي متقدم لإنشاء وصفات فريدة ومخصصة حسب تفضيلاتك.",
  about_f2_title: "توليد صور جميلة",
  about_f2_desc: "كل وصفة تأتي مع صورة مولدة بالذكاء الاصطناعي تمنحك معاينة بصرية.",
  about_f3_title: "نتائج فورية",
  about_f3_desc: "احصل على وصفات كاملة مع المكونات والتعليمات في ثوانٍ.",
  about_f4_title: "آمن وخاص",
  about_f4_desc: "بياناتك محمية لضمان بقاء وصفاتك وتفضيلاتك آمنة.",

  contact_title: "اتصل بنا",
  contact_subtitle: "هل لديك أسئلة أو ملاحظات؟ نحب أن نسمع منك!",
  contact_email_title: "راسلنا",
  contact_email_desc: "للاستفسارات العامة والدعم",
  contact_feedback_title: "ملاحظات",
  contact_feedback_desc: "شاركنا أفكارك واقتراحاتك",
  contact_send_message: "أرسل لنا رسالة",
  contact_name: "الاسم",
  contact_name_placeholder: "اسمك",
  contact_email: "البريد الإلكتروني",
  contact_subject: "الموضوع",
  contact_subject_placeholder: "ما هو الموضوع؟",
  contact_message: "الرسالة",
  contact_message_placeholder: "أخبرنا المزيد...",
  contact_sending: "جاري الإرسال...",
  contact_send: "إرسال الرسالة",

  shop_badge: "أدوات مطبخ مختارة",
  shop_title1: "أدوات مطبخ متميزة",
  shop_title2: "للطبخ العصري",
  shop_desc: "اكتشف أفضل مجموعة من أدوات المطبخ الأساسية التي تحول تجربة الطبخ",
  shop_quality: "جودة متميزة",
  shop_top_rated: "الأعلى تقييماً",
  shop_fast_delivery: "توصيل سريع",
  shop_collection: "تسوق المجموعة",
  shop_collection_desc: "كل منتج يتم اختياره بعناية ليلبي أعلى المعايير",
  shop_now: "تسوق الآن",
  shop_trending: "رائج",
  shop_why: "لماذا تتسوق معنا؟",
  shop_why_desc: "كل منتج يتم اختباره والموافقة عليه بعناية من قبل طهاة محترفين وعشاق الطبخ.",

  res_title: "موارد الطبخ",
  res_subtitle: "أدلة ونصائح أساسية لتطوير مهاراتك في الطهي",
  res_cooking_tips: "نصائح طبخ أساسية",
  res_kitchen_tools: "أدوات المطبخ الأساسية",
  res_tools_desc: "أدوات أساسية يحتاجها كل طاهٍ منزلي:",
  res_pantry: "أساسيات المخزن",
  res_pantry_desc: "اغمر مخزنك بهذه الأساسيات:",
  res_conversions: "دليل التحويلات السريعة",
  res_conversions_desc: "تحويلات القياسات الشائعة:",

  notfound_title: "عذراً! الصفحة غير موجودة",
  notfound_desc: "الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
  notfound_home: "الرئيسية",

  common_servings: "حصص",
};

export const translations: Record<Language, TranslationKeys> = {
  en,
  ar,
  es: { ...en, nav_home: "Inicio", nav_search: "Buscar", nav_categories: "Categorías", nav_generate: "Generar", nav_shop: "Tienda", nav_recipes: "Recetas", nav_favorites: "Favoritos", nav_add_recipe: "Agregar Receta", nav_profile: "Perfil", nav_sign_in: "Iniciar Sesión", home_hero_title: "Descubre Tu Próxima", home_hero_title_accent: "Aventura Culinaria", home_hero_desc: "Generación de recetas con IA adaptada a tu gusto, preferencias dietéticas e ingredientes disponibles", home_search_placeholder: "Busca recetas o describe lo que quieres cocinar...", home_generate_ai: "Generar Receta con IA", home_featured: "Recetas Destacadas", home_featured_desc: "Explora nuestra colección de delicias culinarias generadas por IA", home_loading: "Cargando recetas deliciosas...", home_no_recipes: "No hay recetas aún. ¡Sé el primero en crear una!", home_first_recipe: "Genera Tu Primera Receta", footer_desc: "Descubrimiento y generación de recetas con IA para cocineros caseros en todas partes.", footer_explore: "Explorar", footer_search_recipes: "Buscar Recetas", footer_resources: "Recursos", footer_cooking_guides: "Guías de Cocina", footer_about: "Sobre Nosotros", footer_contact: "Contacto", footer_account: "Cuenta", footer_my_favorites: "Mis Favoritos", footer_shopping_lists: "Listas de Compras", footer_profile: "Perfil", footer_copyright: "FlavorAI. Todos los derechos reservados. Impulsado por IA.", gen_title: "Generar Receta con IA", gen_desc: "Describe lo que quieres cocinar y deja que la IA cree una receta personalizada", gen_what_cook: "¿Qué te gustaría cocinar?", gen_what_cook_placeholder: "Ej: Un plato de pasta picante, Bowl de desayuno saludable...", gen_cuisine: "Tipo de Cocina (Opcional)", gen_ingredients: "Ingredientes Disponibles (Opcional)", gen_add_ingredient_placeholder: "Agregar un ingrediente...", gen_add: "Agregar", gen_dietary: "Preferencias Dietéticas (Opcional)", gen_category: "Categoría de Receta *", gen_generating: "Generando Receta...", gen_generate: "Generar Receta", search_title: "Buscar Recetas", search_placeholder: "Buscar por nombre, cocina o ingredientes...", search_searching: "Buscando recetas...", search_found: "Encontradas", search_recipe: "receta", search_recipes: "recetas", search_no_results: "No se encontraron recetas para", fav_title: "Mis Recetas Favoritas", fav_loading: "Cargando tus favoritos...", fav_empty: "Sin recetas favoritas aún", fav_empty_desc: "¡Explora recetas y guarda tus favoritas!", cat_title: "Explorar Categorías de Recetas", cat_desc: "Explora nuestra colección curada de recetas organizadas por categoría.", cat_search_placeholder: "Buscar categorías...", cat_loading: "Cargando categorías...", cat_no_results: "No se encontraron categorías para", cat_recipes: "Recetas", cat_loading_recipes: "Cargando recetas...", cat_no_recipes: "No hay recetas en esta categoría aún.", cat_be_first: "¡Sé el primero en crear una!", detail_back: "Volver", detail_save: "Guardar", detail_saved: "Guardada", detail_add_to_list: "Agregar a Lista", detail_ingredients: "Ingredientes", detail_instructions: "Instrucciones", detail_more_recipes: "Más Recetas", detail_loading: "Cargando...", detail_servings: "porciones", detail_min: "min", recipes_title: "Mis Recetas", recipes_desc: "Administra todas tus recetas guardadas en un solo lugar", recipes_search: "Buscar recetas...", recipes_no_found: "No se encontraron recetas", recipes_no_yet: "Sin recetas aún", recipes_adjust_search: "Intenta ajustar tu búsqueda", recipes_start_creating: "¡Empieza a crear recetas deliciosas!", recipes_create_first: "Crea Tu Primera Receta", recipes_edit: "Editar", recipes_delete: "Eliminar", recipes_delete_title: "Eliminar Receta", recipes_delete_desc: "¿Estás seguro de que quieres eliminar esta receta? Esta acción no se puede deshacer.", recipes_cancel: "Cancelar", edit_title: "Editar Receta", edit_recipe_title: "Título de la Receta *", edit_description: "Descripción", edit_category: "Categoría", edit_cuisine: "Tipo de Cocina", edit_difficulty: "Dificultad", edit_prep_time: "Tiempo de Preparación (min)", edit_cook_time: "Tiempo de Cocción (min)", edit_servings: "Porciones", edit_dietary: "Preferencias Dietéticas", edit_ingredients: "Ingredientes", edit_add_ingredient: "Agregar Ingrediente", edit_instructions: "Instrucciones", edit_add_step: "Agregar Paso", edit_saving: "Guardando...", edit_save: "Guardar Cambios", edit_cancel: "Cancelar", edit_amount: "Cantidad", edit_ingredient: "Ingrediente", edit_step_placeholder: "Describe este paso", profile_title: "Perfil", profile_account_info: "Información de la Cuenta", profile_email: "Correo", profile_display_name: "Nombre para Mostrar", profile_name_placeholder: "Tu nombre", profile_updating: "Actualizando...", profile_update: "Actualizar Perfil", profile_actions: "Acciones de Cuenta", profile_sign_out: "Cerrar Sesión", profile_loading: "Cargando...", auth_reset_password: "Restablecer Contraseña", auth_welcome_back: "Bienvenido de Nuevo", auth_create_account: "Crear Cuenta", auth_reset_desc: "Ingresa tu correo para recibir un enlace de restablecimiento", auth_sign_in_desc: "Inicia sesión para acceder a tus recetas guardadas", auth_sign_up_desc: "Únete a FlavorAI y descubre recetas increíbles", auth_display_name: "Nombre para Mostrar", auth_email: "Correo", auth_password: "Contraseña", auth_forgot: "¿Olvidaste tu contraseña?", auth_loading: "Cargando...", auth_send_reset: "Enviar Enlace", auth_sign_in: "Iniciar Sesión", auth_or_continue: "O continúa con", auth_back_sign_in: "Volver a iniciar sesión", auth_no_account: "¿No tienes cuenta? Regístrate", auth_has_account: "¿Ya tienes cuenta? Inicia sesión", about_title: "Sobre FlavorAI", about_subtitle: "Revolucionando la cocina casera con generación de recetas con IA", about_mission: "Nuestra Misión", about_mission_p1: "FlavorAI fue creado para hacer la cocina más accesible, creativa y divertida para todos.", about_mission_p2: "Creemos que la gran cocina debe ser accesible para todos, independientemente del nivel de experiencia.", about_features: "Características Clave", about_tech: "Tecnología", about_tech_desc: "FlavorAI está construido con tecnología de vanguardia:", about_f1_title: "Generación de Recetas con IA", about_f1_desc: "IA avanzada para crear recetas únicas y personalizadas.", about_f2_title: "Generación Visual", about_f2_desc: "Cada receta incluye una imagen generada por IA.", about_f3_title: "Resultados Instantáneos", about_f3_desc: "Recetas completas en segundos.", about_f4_title: "Seguro y Privado", about_f4_desc: "Tus datos están protegidos.", contact_title: "Contáctanos", contact_subtitle: "¿Preguntas o comentarios? ¡Nos encantaría saber de ti!", contact_email_title: "Envíanos un Correo", contact_email_desc: "Para consultas generales y soporte", contact_feedback_title: "Comentarios", contact_feedback_desc: "Comparte tus ideas y sugerencias", contact_send_message: "Envíanos un Mensaje", contact_name: "Nombre", contact_name_placeholder: "Tu nombre", contact_email: "Correo", contact_subject: "Asunto", contact_subject_placeholder: "¿De qué se trata?", contact_message: "Mensaje", contact_message_placeholder: "Cuéntanos más...", contact_sending: "Enviando...", contact_send: "Enviar Mensaje", shop_badge: "Esenciales de Cocina", shop_title1: "Herramientas de Cocina Premium", shop_title2: "Para la Cocina Moderna", shop_desc: "Descubre la mejor selección de esenciales de cocina", shop_quality: "Calidad Premium", shop_top_rated: "Mejor Calificados", shop_fast_delivery: "Entrega Rápida", shop_collection: "Comprar la Colección", shop_collection_desc: "Cada producto seleccionado cuidadosamente", shop_now: "Comprar Ahora", shop_trending: "Tendencia", shop_why: "¿Por Qué Comprar Con Nosotros?", shop_why_desc: "Cada producto probado y aprobado por chefs profesionales.", res_title: "Recursos de Cocina", res_subtitle: "Guías y consejos esenciales para mejorar tus habilidades culinarias", res_cooking_tips: "Consejos de Cocina Esenciales", res_kitchen_tools: "Herramientas de Cocina Esenciales", res_tools_desc: "Herramientas fundamentales para todo cocinero:", res_pantry: "Esenciales de la Despensa", res_pantry_desc: "Abastece tu despensa con estos básicos:", res_conversions: "Guía Rápida de Conversiones", res_conversions_desc: "Conversiones de medidas comunes:", notfound_title: "¡Ups! Página no encontrada", notfound_desc: "La página que buscas no existe o fue movida.", notfound_home: "Inicio", common_servings: "porciones" },
  fr: { ...en, nav_home: "Accueil", nav_search: "Rechercher", nav_categories: "Catégories", nav_generate: "Générer", nav_shop: "Boutique", nav_recipes: "Recettes", nav_favorites: "Favoris", nav_add_recipe: "Ajouter Recette", nav_profile: "Profil", nav_sign_in: "Se Connecter", home_hero_title: "Découvrez Votre Prochaine", home_hero_title_accent: "Aventure Culinaire", home_hero_desc: "Génération de recettes par IA adaptée à vos goûts, préférences alimentaires et ingrédients disponibles", home_search_placeholder: "Recherchez des recettes ou décrivez ce que vous voulez cuisiner...", home_generate_ai: "Générer une Recette IA", home_featured: "Recettes en Vedette", home_featured_desc: "Explorez notre collection de délices culinaires générés par IA", home_loading: "Chargement des recettes...", home_no_recipes: "Pas encore de recettes. Soyez le premier à en créer une!", home_first_recipe: "Générez Votre Première Recette", footer_desc: "Découverte et génération de recettes par IA pour les cuisiniers amateurs partout.", footer_explore: "Explorer", footer_search_recipes: "Rechercher des Recettes", footer_resources: "Ressources", footer_cooking_guides: "Guides de Cuisine", footer_about: "À Propos", footer_contact: "Contact", footer_account: "Compte", footer_my_favorites: "Mes Favoris", footer_shopping_lists: "Listes de Courses", footer_profile: "Profil", footer_copyright: "FlavorAI. Tous droits réservés. Propulsé par IA.", notfound_title: "Oups ! Page introuvable", notfound_desc: "La page que vous cherchez n'existe pas ou a été déplacée.", notfound_home: "Accueil", common_servings: "portions", gen_title: "Générer une Recette IA", gen_desc: "Décrivez ce que vous voulez cuisiner et laissez l'IA créer une recette personnalisée", gen_what_cook: "Que souhaitez-vous cuisiner ?", gen_what_cook_placeholder: "Ex: Un plat de pâtes épicé, Bol de petit-déjeuner sain...", gen_cuisine: "Type de Cuisine (Optionnel)", gen_ingredients: "Ingrédients Disponibles (Optionnel)", gen_add_ingredient_placeholder: "Ajouter un ingrédient...", gen_add: "Ajouter", gen_dietary: "Préférences Alimentaires (Optionnel)", gen_category: "Catégorie de Recette *", gen_generating: "Génération en cours...", gen_generate: "Générer la Recette", search_title: "Rechercher des Recettes", search_placeholder: "Rechercher par nom, cuisine ou ingrédients...", search_searching: "Recherche en cours...", search_found: "Trouvé", search_recipe: "recette", search_recipes: "recettes", search_no_results: "Aucune recette trouvée pour", fav_title: "Mes Recettes Favorites", fav_loading: "Chargement de vos favoris...", fav_empty: "Pas encore de recettes favorites", fav_empty_desc: "Explorez des recettes et sauvegardez vos favorites !", detail_back: "Retour", detail_save: "Sauvegarder", detail_saved: "Sauvegardée", detail_add_to_list: "Ajouter à la Liste", detail_ingredients: "Ingrédients", detail_instructions: "Instructions", detail_more_recipes: "Plus de Recettes", detail_loading: "Chargement...", detail_servings: "portions", detail_min: "min", cat_title: "Parcourir les Catégories", cat_desc: "Explorez notre collection de recettes organisées par catégorie.", cat_search_placeholder: "Rechercher des catégories...", cat_loading: "Chargement...", cat_no_results: "Aucune catégorie trouvée pour", cat_recipes: "Recettes", cat_loading_recipes: "Chargement...", cat_no_recipes: "Pas encore de recettes dans cette catégorie.", cat_be_first: "Soyez le premier à en créer une !", recipes_title: "Mes Recettes", recipes_desc: "Gérez toutes vos recettes en un seul endroit", recipes_search: "Rechercher des recettes...", recipes_no_found: "Aucune recette trouvée", recipes_no_yet: "Pas encore de recettes", recipes_adjust_search: "Essayez d'ajuster votre recherche", recipes_start_creating: "Commencez à créer des recettes délicieuses !", recipes_create_first: "Créez Votre Première Recette", recipes_edit: "Modifier", recipes_delete: "Supprimer", recipes_delete_title: "Supprimer la Recette", recipes_delete_desc: "Êtes-vous sûr de vouloir supprimer cette recette ? Cette action est irréversible.", recipes_cancel: "Annuler", edit_title: "Modifier la Recette", edit_recipe_title: "Titre *", edit_description: "Description", edit_category: "Catégorie", edit_cuisine: "Type de Cuisine", edit_difficulty: "Difficulté", edit_prep_time: "Temps de Préparation (min)", edit_cook_time: "Temps de Cuisson (min)", edit_servings: "Portions", edit_dietary: "Préférences Alimentaires", edit_ingredients: "Ingrédients", edit_add_ingredient: "Ajouter Ingrédient", edit_instructions: "Instructions", edit_add_step: "Ajouter Étape", edit_saving: "Sauvegarde...", edit_save: "Sauvegarder", edit_cancel: "Annuler", edit_amount: "Quantité", edit_ingredient: "Ingrédient", edit_step_placeholder: "Décrivez cette étape", profile_title: "Profil", profile_account_info: "Informations du Compte", profile_email: "Email", profile_display_name: "Nom d'Affichage", profile_name_placeholder: "Votre nom", profile_updating: "Mise à jour...", profile_update: "Mettre à jour", profile_actions: "Actions du Compte", profile_sign_out: "Se Déconnecter", profile_loading: "Chargement...", auth_reset_password: "Réinitialiser le Mot de Passe", auth_welcome_back: "Content de Vous Revoir", auth_create_account: "Créer un Compte", auth_reset_desc: "Entrez votre email pour recevoir un lien de réinitialisation", auth_sign_in_desc: "Connectez-vous pour accéder à vos recettes", auth_sign_up_desc: "Rejoignez FlavorAI et découvrez des recettes incroyables", auth_display_name: "Nom d'Affichage", auth_email: "Email", auth_password: "Mot de Passe", auth_forgot: "Mot de passe oublié ?", auth_loading: "Chargement...", auth_send_reset: "Envoyer le Lien", auth_sign_in: "Se Connecter", auth_or_continue: "Ou continuer avec", auth_back_sign_in: "Retour à la connexion", auth_no_account: "Pas de compte ? Inscrivez-vous", auth_has_account: "Déjà un compte ? Connectez-vous", about_title: "À Propos de FlavorAI", about_subtitle: "Révolutionner la cuisine maison avec la génération de recettes par IA", about_mission: "Notre Mission", about_mission_p1: "FlavorAI a été créé pour rendre la cuisine plus accessible, créative et agréable pour tous.", about_mission_p2: "Nous croyons que la grande cuisine doit être accessible à tous.", about_features: "Fonctionnalités Clés", about_tech: "Technologies", about_tech_desc: "FlavorAI est construit avec des technologies de pointe :", about_f1_title: "Génération par IA", about_f1_desc: "IA avancée pour des recettes uniques et personnalisées.", about_f2_title: "Génération Visuelle", about_f2_desc: "Chaque recette avec une image générée par IA.", about_f3_title: "Résultats Instantanés", about_f3_desc: "Recettes complètes en quelques secondes.", about_f4_title: "Sécurisé et Privé", about_f4_desc: "Vos données sont protégées.", contact_title: "Contactez-Nous", contact_subtitle: "Des questions ? Nous serions ravis de vous entendre !", contact_email_title: "Envoyez-nous un Email", contact_email_desc: "Pour les demandes générales et le support", contact_feedback_title: "Commentaires", contact_feedback_desc: "Partagez vos idées et suggestions", contact_send_message: "Envoyez-nous un Message", contact_name: "Nom", contact_name_placeholder: "Votre nom", contact_email: "Email", contact_subject: "Sujet", contact_subject_placeholder: "De quoi s'agit-il ?", contact_message: "Message", contact_message_placeholder: "Dites-nous en plus...", contact_sending: "Envoi...", contact_send: "Envoyer", shop_badge: "Essentiels de Cuisine", shop_title1: "Outils de Cuisine Premium", shop_title2: "Pour la Cuisine Moderne", shop_desc: "Découvrez la meilleure sélection d'essentiels de cuisine", shop_quality: "Qualité Premium", shop_top_rated: "Les Mieux Notés", shop_fast_delivery: "Livraison Rapide", shop_collection: "Acheter la Collection", shop_collection_desc: "Chaque produit soigneusement sélectionné", shop_now: "Acheter", shop_trending: "Tendance", shop_why: "Pourquoi Acheter Chez Nous ?", shop_why_desc: "Chaque produit testé et approuvé par des chefs professionnels.", res_title: "Ressources Culinaires", res_subtitle: "Guides et conseils essentiels pour élever vos compétences culinaires", res_cooking_tips: "Conseils de Cuisine Essentiels", res_kitchen_tools: "Outils de Cuisine Essentiels", res_tools_desc: "Outils fondamentaux pour tout cuisinier :", res_pantry: "Essentiels du Garde-Manger", res_pantry_desc: "Garnissez votre garde-manger avec ces bases :", res_conversions: "Guide Rapide de Conversions", res_conversions_desc: "Conversions de mesures courantes :" },
  de: { ...en, nav_home: "Startseite", nav_search: "Suche", nav_categories: "Kategorien", nav_generate: "Generieren", nav_shop: "Shop", nav_recipes: "Rezepte", nav_favorites: "Favoriten", nav_add_recipe: "Rezept hinzufügen", nav_profile: "Profil", nav_sign_in: "Anmelden", home_hero_title: "Entdecke Dein Nächstes", home_hero_title_accent: "Kulinarisches Abenteuer", home_featured: "Empfohlene Rezepte", footer_explore: "Entdecken", footer_copyright: "FlavorAI. Alle Rechte vorbehalten. Powered by KI.", notfound_title: "Seite nicht gefunden", notfound_home: "Startseite", common_servings: "Portionen" },
  tr: { ...en, nav_home: "Ana Sayfa", nav_search: "Ara", nav_categories: "Kategoriler", nav_generate: "Oluştur", nav_shop: "Mağaza", nav_recipes: "Tarifler", nav_favorites: "Favoriler", nav_add_recipe: "Tarif Ekle", nav_profile: "Profil", nav_sign_in: "Giriş Yap", home_hero_title: "Bir Sonraki", home_hero_title_accent: "Mutfak Maceranızı Keşfedin", home_featured: "Öne Çıkan Tarifler", footer_explore: "Keşfet", notfound_title: "Sayfa bulunamadı", notfound_home: "Ana Sayfa", common_servings: "porsiyon" },
  zh: { ...en, nav_home: "首页", nav_search: "搜索", nav_categories: "分类", nav_generate: "生成", nav_shop: "商店", nav_recipes: "食谱", nav_favorites: "收藏", nav_add_recipe: "添加食谱", nav_profile: "个人资料", nav_sign_in: "登录", home_hero_title: "探索你的下一个", home_hero_title_accent: "烹饪冒险", home_featured: "精选食谱", footer_explore: "探索", notfound_title: "页面未找到", notfound_home: "首页", common_servings: "人份" },
  ja: { ...en, nav_home: "ホーム", nav_search: "検索", nav_categories: "カテゴリ", nav_generate: "生成", nav_shop: "ショップ", nav_recipes: "レシピ", nav_favorites: "お気に入り", nav_add_recipe: "レシピ追加", nav_profile: "プロフィール", nav_sign_in: "ログイン", home_hero_title: "次の", home_hero_title_accent: "料理の冒険を見つけよう", home_featured: "おすすめレシピ", footer_explore: "探索", notfound_title: "ページが見つかりません", notfound_home: "ホーム", common_servings: "人前" },
  ru: { ...en, nav_home: "Главная", nav_search: "Поиск", nav_categories: "Категории", nav_generate: "Создать", nav_shop: "Магазин", nav_recipes: "Рецепты", nav_favorites: "Избранное", nav_add_recipe: "Добавить рецепт", nav_profile: "Профиль", nav_sign_in: "Войти", home_hero_title: "Откройте Ваше Следующее", home_hero_title_accent: "Кулинарное Приключение", home_featured: "Избранные Рецепты", footer_explore: "Исследовать", notfound_title: "Страница не найдена", notfound_home: "Главная", common_servings: "порций" },
  hi: { ...en, nav_home: "होम", nav_search: "खोजें", nav_categories: "श्रेणियाँ", nav_generate: "बनाएं", nav_shop: "दुकान", nav_recipes: "रेसिपी", nav_favorites: "पसंदीदा", nav_add_recipe: "रेसिपी जोड़ें", nav_profile: "प्रोफ़ाइल", nav_sign_in: "साइन इन", home_hero_title: "अपना अगला", home_hero_title_accent: "पाक साहसिक खोजें", home_featured: "विशेष रेसिपी", footer_explore: "अन्वेषण", notfound_title: "पेज नहीं मिला", notfound_home: "होम", common_servings: "सर्विंग्स" },
  ko: { ...en, nav_home: "홈", nav_search: "검색", nav_categories: "카테고리", nav_generate: "생성", nav_shop: "쇼핑", nav_recipes: "레시피", nav_favorites: "즐겨찾기", nav_add_recipe: "레시피 추가", nav_profile: "프로필", nav_sign_in: "로그인", home_hero_title: "다음", home_hero_title_accent: "요리 모험을 발견하세요", home_featured: "추천 레시피", footer_explore: "탐색", notfound_title: "페이지를 찾을 수 없습니다", notfound_home: "홈", common_servings: "인분" },
  pt: { ...en, nav_home: "Início", nav_search: "Pesquisar", nav_categories: "Categorias", nav_generate: "Gerar", nav_shop: "Loja", nav_recipes: "Receitas", nav_favorites: "Favoritos", nav_add_recipe: "Adicionar Receita", nav_profile: "Perfil", nav_sign_in: "Entrar", home_hero_title: "Descubra Sua Próxima", home_hero_title_accent: "Aventura Culinária", home_featured: "Receitas em Destaque", footer_explore: "Explorar", notfound_title: "Página não encontrada", notfound_home: "Início", common_servings: "porções" },
  it: { ...en, nav_home: "Home", nav_search: "Cerca", nav_categories: "Categorie", nav_generate: "Genera", nav_shop: "Negozio", nav_recipes: "Ricette", nav_favorites: "Preferiti", nav_add_recipe: "Aggiungi Ricetta", nav_profile: "Profilo", nav_sign_in: "Accedi", home_hero_title: "Scopri la Tua Prossima", home_hero_title_accent: "Avventura Culinaria", home_featured: "Ricette in Evidenza", footer_explore: "Esplora", notfound_title: "Pagina non trovata", notfound_home: "Home", common_servings: "porzioni" },
  nl: { ...en, nav_home: "Home", nav_search: "Zoeken", nav_categories: "Categorieën", nav_generate: "Genereren", nav_shop: "Winkel", nav_recipes: "Recepten", nav_favorites: "Favorieten", nav_add_recipe: "Recept Toevoegen", nav_profile: "Profiel", nav_sign_in: "Inloggen", home_hero_title: "Ontdek Je Volgende", home_hero_title_accent: "Culinair Avontuur", home_featured: "Uitgelichte Recepten", footer_explore: "Ontdekken", notfound_title: "Pagina niet gevonden", notfound_home: "Home", common_servings: "porties" },
};

// Minimal static translations dictionary - synchronous, no API calls
export const UI_TRANSLATIONS: Record<string, Record<string, string>> = {
  // Navigation
  "Home": { ar: "الرئيسية", zh: "首页", ja: "ホーム", de: "Startseite", nl: "Home", es: "Inicio", it: "Home", ru: "Главная" },
  "Recipes": { ar: "الوصفات", zh: "食谱", ja: "レシピ", de: "Rezepte", nl: "Recepten", es: "Recetas", it: "Ricette", ru: "Рецепты" },
  "Categories": { ar: "الفئات", zh: "分类", ja: "カテゴリー", de: "Kategorien", nl: "Categorieën", es: "Categorías", it: "Categorie", ru: "Категории" },
  "Favorites": { ar: "المفضلة", zh: "收藏", ja: "お気に入り", de: "Favoriten", nl: "Favorieten", es: "Favoritos", it: "Preferiti", ru: "Избранное" },
  "Profile": { ar: "الملف الشخصي", zh: "个人资料", ja: "プロフィール", de: "Profil", nl: "Profiel", es: "Perfil", it: "Profilo", ru: "Профиль" },
  "Search": { ar: "بحث", zh: "搜索", ja: "検索", de: "Suche", nl: "Zoeken", es: "Buscar", it: "Cerca", ru: "Поиск" },
  "Generate": { ar: "إنشاء", zh: "生成", ja: "生成", de: "Generieren", nl: "Genereren", es: "Generar", it: "Genera", ru: "Создать" },
  "Shop": { ar: "المتجر", zh: "商店", ja: "ショップ", de: "Shop", nl: "Winkel", es: "Tienda", it: "Negozio", ru: "Магазин" },
  "Resources": { ar: "الموارد", zh: "资源", ja: "リソース", de: "Ressourcen", nl: "Bronnen", es: "Recursos", it: "Risorse", ru: "Ресурсы" },
  "About": { ar: "حول", zh: "关于", ja: "について", de: "Über uns", nl: "Over ons", es: "Acerca de", it: "Chi siamo", ru: "О нас" },
  "Contact": { ar: "اتصل بنا", zh: "联系我们", ja: "お問い合わせ", de: "Kontakt", nl: "Contact", es: "Contacto", it: "Contatti", ru: "Контакты" },
  "Sign In": { ar: "تسجيل الدخول", zh: "登录", ja: "サインイン", de: "Anmelden", nl: "Inloggen", es: "Iniciar sesión", it: "Accedi", ru: "Войти" },
  "Sign Out": { ar: "تسجيل الخروج", zh: "退出", ja: "サインアウト", de: "Abmelden", nl: "Uitloggen", es: "Cerrar sesión", it: "Esci", ru: "Выйти" },
  "Select Language": { ar: "اختر اللغة", zh: "选择语言", ja: "言語を選択", de: "Sprache auswählen", nl: "Taal selecteren", es: "Seleccionar idioma", it: "Seleziona lingua", ru: "Выбрать язык" },

  // Common UI
  "min": { ar: "دقيقة", zh: "分钟", ja: "分", de: "Min", nl: "min", es: "min", it: "min", ru: "мин" },
  "servings": { ar: "حصص", zh: "份", ja: "人前", de: "Portionen", nl: "porties", es: "porciones", it: "porzioni", ru: "порций" },
  "Loading...": { ar: "جاري التحميل...", zh: "加载中...", ja: "読み込み中...", de: "Laden...", nl: "Laden...", es: "Cargando...", it: "Caricamento...", ru: "Загрузка..." },
  "Save": { ar: "حفظ", zh: "保存", ja: "保存", de: "Speichern", nl: "Opslaan", es: "Guardar", it: "Salva", ru: "Сохранить" },
  "Cancel": { ar: "إلغاء", zh: "取消", ja: "キャンセル", de: "Abbrechen", nl: "Annuleren", es: "Cancelar", it: "Annulla", ru: "Отмена" },
  "Delete": { ar: "حذف", zh: "删除", ja: "削除", de: "Löschen", nl: "Verwijderen", es: "Eliminar", it: "Elimina", ru: "Удалить" },
  "Edit": { ar: "تعديل", zh: "编辑", ja: "編集", de: "Bearbeiten", nl: "Bewerken", es: "Editar", it: "Modifica", ru: "Редактировать" },

  // Difficulty
  "Easy": { ar: "سهل", zh: "简单", ja: "簡単", de: "Einfach", nl: "Makkelijk", es: "Fácil", it: "Facile", ru: "Легко" },
  "Medium": { ar: "متوسط", zh: "中等", ja: "普通", de: "Mittel", nl: "Gemiddeld", es: "Medio", it: "Medio", ru: "Средне" },
  "Hard": { ar: "صعب", zh: "困难", ja: "難しい", de: "Schwer", nl: "Moeilijk", es: "Difícil", it: "Difficile", ru: "Сложно" },

  // Favorites
  "Please sign in to save favorites": { ar: "يرجى تسجيل الدخول لحفظ المفضلة", zh: "请登录以保存收藏", ja: "お気に入りを保存するにはログインしてください", de: "Bitte melden Sie sich an, um Favoriten zu speichern", nl: "Log in om favorieten op te slaan", es: "Inicia sesión para guardar favoritos", it: "Accedi per salvare i preferiti", ru: "Войдите, чтобы сохранить избранное" },
  "Removed from favorites": { ar: "تمت الإزالة من المفضلة", zh: "已从收藏中移除", ja: "お気に入りから削除しました", de: "Aus Favoriten entfernt", nl: "Verwijderd uit favorieten", es: "Eliminado de favoritos", it: "Rimosso dai preferiti", ru: "Удалено из избранного" },
  "Added to favorites": { ar: "تمت الإضافة إلى المفضلة", zh: "已添加到收藏", ja: "お気に入りに追加しました", de: "Zu Favoriten hinzugefügt", nl: "Toegevoegd aan favorieten", es: "Añadido a favoritos", it: "Aggiunto ai preferiti", ru: "Добавлено в избранное" },
  "Failed to update favorites": { ar: "فشل تحديث المفضلة", zh: "更新收藏失败", ja: "お気に入りの更新に失敗しました", de: "Favoriten-Aktualisierung fehlgeschlagen", nl: "Favorieten bijwerken mislukt", es: "Error al actualizar favoritos", it: "Aggiornamento preferiti fallito", ru: "Не удалось обновить избранное" },

  // Home page
  "Discover Your Next": { ar: "اكتشف مغامرتك", zh: "发现您的下一个", ja: "次の", de: "Entdecken Sie Ihr nächstes", nl: "Ontdek uw volgende", es: "Descubre tu próxima", it: "Scopri la tua prossima", ru: "Откройте для себя" },
  "Culinary Adventure": { ar: "الطهي القادمة", zh: "烹饪冒险", ja: "料理の冒険を発見", de: "Kulinarisches Abenteuer", nl: "Culinair avontuur", es: "Aventura Culinaria", it: "Avventura Culinaria", ru: "Кулинарное приключение" },
  "AI-powered recipe generation tailored to your taste, dietary preferences, and available ingredients": { ar: "توليد وصفات بالذكاء الاصطناعي مصممة حسب ذوقك وتفضيلاتك الغذائية والمكونات المتاحة", zh: "根据您的口味、饮食偏好和可用食材定制的AI食谱生成", ja: "あなたの好み、食事制限、利用可能な食材に合わせたAIレシピ生成", de: "KI-gestützte Rezeptgenerierung, abgestimmt auf Ihren Geschmack, Ernährungspräferenzen und verfügbare Zutaten", nl: "AI-gestuurde receptgeneratie afgestemd op uw smaak, dieetvoorkeuren en beschikbare ingrediënten", es: "Generación de recetas con IA adaptada a tu gusto, preferencias dietéticas e ingredientes disponibles", it: "Generazione di ricette AI adattata ai tuoi gusti, preferenze alimentari e ingredienti disponibili", ru: "Генерация рецептов с ИИ, адаптированная к вашему вкусу, диетическим предпочтениям и доступным ингредиентам" },
  "Search recipes or describe what you want to cook...": { ar: "ابحث عن وصفات أو صف ما تريد طهيه...", zh: "搜索食谱或描述您想做的菜...", ja: "レシピを検索するか、作りたい料理を説明してください...", de: "Rezepte suchen oder beschreiben Sie, was Sie kochen möchten...", nl: "Zoek recepten of beschrijf wat u wilt koken...", es: "Busca recetas o describe lo que quieres cocinar...", it: "Cerca ricette o descrivi cosa vuoi cucinare...", ru: "Поиск рецептов или опишите, что хотите приготовить..." },
  "Generate AI Recipe": { ar: "إنشاء وصفة بالذكاء الاصطناعي", zh: "生成AI食谱", ja: "AIレシピを生成", de: "KI-Rezept generieren", nl: "AI-recept genereren", es: "Generar receta con IA", it: "Genera ricetta AI", ru: "Создать рецепт с ИИ" },
  "Featured Recipes": { ar: "الوصفات المميزة", zh: "精选食谱", ja: "おすすめレシピ", de: "Ausgewählte Rezepte", nl: "Uitgelichte recepten", es: "Recetas destacadas", it: "Ricette in evidenza", ru: "Избранные рецепты" },
  "Explore our collection of AI-generated culinary delights": { ar: "استكشف مجموعتنا من الأطباق الشهية المولدة بالذكاء الاصطناعي", zh: "探索我们的AI生成美食系列", ja: "AIが生成した料理コレクションをご覧ください", de: "Entdecken Sie unsere Sammlung von KI-generierten kulinarischen Köstlichkeiten", nl: "Ontdek onze collectie AI-gegenereerde culinaire lekkernijen", es: "Explora nuestra colección de delicias culinarias generadas por IA", it: "Esplora la nostra collezione di delizie culinarie generate dall'AI", ru: "Откройте нашу коллекцию кулинарных блюд, созданных ИИ" },
  "Loading delicious recipes...": { ar: "جاري تحميل الوصفات الشهية...", zh: "正在加载美味食谱...", ja: "おいしいレシピを読み込み中...", de: "Lade leckere Rezepte...", nl: "Heerlijke recepten laden...", es: "Cargando recetas deliciosas...", it: "Caricamento ricette deliziose...", ru: "Загрузка вкусных рецептов..." },
  "No recipes yet. Be the first to create one!": { ar: "لا توجد وصفات بعد. كن أول من ينشئ واحدة!", zh: "还没有食谱。成为第一个创建的人！", ja: "まだレシピがありません。最初の一つを作成しましょう！", de: "Noch keine Rezepte. Seien Sie der Erste, der eines erstellt!", nl: "Nog geen recepten. Wees de eerste die er een maakt!", es: "Aún no hay recetas. ¡Sé el primero en crear una!", it: "Ancora nessuna ricetta. Sii il primo a crearne una!", ru: "Рецептов пока нет. Будьте первым, кто создаст!" },
  "Generate Your First Recipe": { ar: "أنشئ وصفتك الأولى", zh: "生成您的第一个食谱", ja: "最初のレシピを生成", de: "Erstellen Sie Ihr erstes Rezept", nl: "Genereer uw eerste recept", es: "Genera tu primera receta", it: "Genera la tua prima ricetta", ru: "Создайте свой первый рецепт" },
  "Failed to load recipes": { ar: "فشل تحميل الوصفات", zh: "加载食谱失败", ja: "レシピの読み込みに失敗しました", de: "Rezepte konnten nicht geladen werden", nl: "Recepten laden mislukt", es: "Error al cargar recetas", it: "Caricamento ricette fallito", ru: "Не удалось загрузить рецепты" },

  // Search page
  "Search Recipes": { ar: "ابحث عن الوصفات", zh: "搜索食谱", ja: "レシピを検索", de: "Rezepte suchen", nl: "Recepten zoeken", es: "Buscar recetas", it: "Cerca ricette", ru: "Поиск рецептов" },
  "Find your perfect recipe": { ar: "ابحث عن وصفتك المثالية", zh: "找到您的完美食谱", ja: "完璧なレシピを見つけよう", de: "Finden Sie Ihr perfektes Rezept", nl: "Vind uw perfecte recept", es: "Encuentra tu receta perfecta", it: "Trova la tua ricetta perfetta", ru: "Найдите идеальный рецепт" },
  "No results found": { ar: "لم يتم العثور على نتائج", zh: "未找到结果", ja: "結果が見つかりません", de: "Keine Ergebnisse gefunden", nl: "Geen resultaten gevonden", es: "No se encontraron resultados", it: "Nessun risultato trovato", ru: "Результаты не найдены" },
  "recipes found": { ar: "وصفات موجودة", zh: "个食谱", ja: "件のレシピ", de: "Rezepte gefunden", nl: "recepten gevonden", es: "recetas encontradas", it: "ricette trovate", ru: "рецептов найдено" },

  // Categories page
  "Browse Recipe Categories": { ar: "تصفح فئات الوصفات", zh: "浏览食谱分类", ja: "レシピカテゴリーを閲覧", de: "Rezeptkategorien durchsuchen", nl: "Receptcategorieën bekijken", es: "Explorar categorías de recetas", it: "Sfoglia le categorie di ricette", ru: "Просмотр категорий рецептов" },
  "Explore recipes organized by category": { ar: "استكشف الوصفات حسب الفئة", zh: "按分类探索食谱", ja: "カテゴリー別にレシピを探索", de: "Rezepte nach Kategorie erkunden", nl: "Recepten per categorie verkennen", es: "Explora recetas por categoría", it: "Esplora ricette per categoria", ru: "Рецепты по категориям" },
  "Search categories...": { ar: "ابحث عن الفئات...", zh: "搜索分类...", ja: "カテゴリーを検索...", de: "Kategorien suchen...", nl: "Categorieën zoeken...", es: "Buscar categorías...", it: "Cerca categorie...", ru: "Поиск категорий..." },
  "No categories found": { ar: "لم يتم العثور على فئات", zh: "未找到分类", ja: "カテゴリーが見つかりません", de: "Keine Kategorien gefunden", nl: "Geen categorieën gevonden", es: "No se encontraron categorías", it: "Nessuna categoria trovata", ru: "Категории не найдены" },
  "recipe": { ar: "وصفة", zh: "个食谱", ja: "レシピ", de: "Rezept", nl: "recept", es: "receta", it: "ricetta", ru: "рецепт" },
  "recipes": { ar: "وصفات", zh: "个食谱", ja: "レシピ", de: "Rezepte", nl: "recepten", es: "recetas", it: "ricette", ru: "рецептов" },
  "Back to Categories": { ar: "العودة إلى الفئات", zh: "返回分类", ja: "カテゴリーに戻る", de: "Zurück zu Kategorien", nl: "Terug naar categorieën", es: "Volver a categorías", it: "Torna alle categorie", ru: "Назад к категориям" },
  "No recipes in this category yet.": { ar: "لا توجد وصفات في هذه الفئة بعد.", zh: "此分类暂无食谱。", ja: "このカテゴリにはまだレシピがありません。", de: "Noch keine Rezepte in dieser Kategorie.", nl: "Nog geen recepten in deze categorie.", es: "Aún no hay recetas en esta categoría.", it: "Ancora nessuna ricetta in questa categoria.", ru: "В этой категории пока нет рецептов." },

  // Favorites page
  "My Favorites": { ar: "المفضلة لدي", zh: "我的收藏", ja: "お気に入り", de: "Meine Favoriten", nl: "Mijn favorieten", es: "Mis favoritos", it: "I miei preferiti", ru: "Мое избранное" },
  "Your saved recipe collection": { ar: "مجموعة وصفاتك المحفوظة", zh: "您保存的食谱收藏", ja: "保存したレシピコレクション", de: "Ihre gespeicherte Rezeptsammlung", nl: "Uw opgeslagen receptencollectie", es: "Tu colección de recetas guardadas", it: "La tua collezione di ricette salvate", ru: "Ваша коллекция сохраненных рецептов" },
  "Sign in to see your favorites": { ar: "سجل الدخول لرؤية المفضلة", zh: "登录查看收藏", ja: "お気に入りを見るにはログイン", de: "Anmelden, um Favoriten zu sehen", nl: "Log in om favorieten te zien", es: "Inicia sesión para ver favoritos", it: "Accedi per vedere i preferiti", ru: "Войдите, чтобы увидеть избранное" },
  "Start exploring recipes to add to your favorites!": { ar: "ابدأ باستكشاف الوصفات لإضافتها إلى مفضلتك!", zh: "开始探索食谱并添加到收藏！", ja: "レシピを探索してお気に入りに追加しましょう！", de: "Entdecken Sie Rezepte und fügen Sie sie zu Favoriten hinzu!", nl: "Ontdek recepten en voeg ze toe aan favorieten!", es: "¡Explora recetas y agrégalas a favoritos!", it: "Esplora ricette e aggiungile ai preferiti!", ru: "Начните изучать рецепты и добавляйте в избранное!" },
  "No favorites yet": { ar: "لا توجد مفضلات بعد", zh: "暂无收藏", ja: "お気に入りはまだありません", de: "Noch keine Favoriten", nl: "Nog geen favorieten", es: "Aún no hay favoritos", it: "Ancora nessun preferito", ru: "Избранного пока нет" },
  "Browse Recipes": { ar: "تصفح الوصفات", zh: "浏览食谱", ja: "レシピを閲覧", de: "Rezepte durchsuchen", nl: "Recepten bekijken", es: "Explorar recetas", it: "Sfoglia ricette", ru: "Просмотреть рецепты" },

  // Footer
  "Your AI-powered culinary companion for discovering and creating amazing recipes.": { ar: "رفيقك الطهوي المدعوم بالذكاء الاصطناعي لاكتشاف وإنشاء وصفات مذهلة.", zh: "您的AI烹饪助手，助您发现和创造美味食谱。", ja: "素晴らしいレシピを発見・作成するAI料理コンパニオン。", de: "Ihr KI-gestützter kulinarischer Begleiter für die Entdeckung und Erstellung erstaunlicher Rezepte.", nl: "Uw AI-gestuurde culinaire partner voor het ontdekken en maken van geweldige recepten.", es: "Tu compañero culinario con IA para descubrir y crear recetas increíbles.", it: "Il tuo compagno culinario AI per scoprire e creare ricette straordinarie.", ru: "Ваш кулинарный помощник с ИИ для открытия и создания удивительных рецептов." },
  "Quick Links": { ar: "روابط سريعة", zh: "快速链接", ja: "クイックリンク", de: "Schnelllinks", nl: "Snelle links", es: "Enlaces rápidos", it: "Link rapidi", ru: "Быстрые ссылки" },
  "All rights reserved.": { ar: "جميع الحقوق محفوظة.", zh: "版权所有。", ja: "全著作権所有。", de: "Alle Rechte vorbehalten.", nl: "Alle rechten voorbehouden.", es: "Todos los derechos reservados.", it: "Tutti i diritti riservati.", ru: "Все права защищены." },

  // Auth
  "Welcome Back": { ar: "مرحباً بعودتك", zh: "欢迎回来", ja: "おかえりなさい", de: "Willkommen zurück", nl: "Welkom terug", es: "Bienvenido de nuevo", it: "Bentornato", ru: "С возвращением" },
  "Create Account": { ar: "إنشاء حساب", zh: "创建账户", ja: "アカウント作成", de: "Konto erstellen", nl: "Account aanmaken", es: "Crear cuenta", it: "Crea account", ru: "Создать аккаунт" },
  "Sign in to access your saved recipes": { ar: "سجل الدخول للوصول إلى وصفاتك المحفوظة", zh: "登录以访问您保存的食谱", ja: "保存したレシピにアクセスするにはログイン", de: "Melden Sie sich an, um auf gespeicherte Rezepte zuzugreifen", nl: "Log in om uw opgeslagen recepten te bekijken", es: "Inicia sesión para acceder a tus recetas guardadas", it: "Accedi per accedere alle tue ricette salvate", ru: "Войдите для доступа к сохраненным рецептам" },
  "Join FlavorAI and start discovering amazing recipes": { ar: "انضم إلى FlavorAI وابدأ في اكتشاف وصفات مذهلة", zh: "加入FlavorAI，开始发现美味食谱", ja: "FlavorAIに参加して素晴らしいレシピを発見", de: "Treten Sie FlavorAI bei und entdecken Sie tolle Rezepte", nl: "Word lid van FlavorAI en ontdek geweldige recepten", es: "Únete a FlavorAI y descubre recetas increíbles", it: "Unisciti a FlavorAI e scopri ricette straordinarie", ru: "Присоединяйтесь к FlavorAI и открывайте рецепты" },
  "Display Name": { ar: "اسم العرض", zh: "显示名称", ja: "表示名", de: "Anzeigename", nl: "Weergavenaam", es: "Nombre para mostrar", it: "Nome visualizzato", ru: "Отображаемое имя" },
  "Your name": { ar: "اسمك", zh: "您的姓名", ja: "あなたの名前", de: "Ihr Name", nl: "Uw naam", es: "Tu nombre", it: "Il tuo nome", ru: "Ваше имя" },
  "Email": { ar: "البريد الإلكتروني", zh: "邮箱", ja: "メール", de: "E-Mail", nl: "E-mail", es: "Correo electrónico", it: "Email", ru: "Электронная почта" },
  "Password": { ar: "كلمة المرور", zh: "密码", ja: "パスワード", de: "Passwort", nl: "Wachtwoord", es: "Contraseña", it: "Password", ru: "Пароль" },
  "Forgot password?": { ar: "نسيت كلمة المرور؟", zh: "忘记密码？", ja: "パスワードを忘れましたか？", de: "Passwort vergessen?", nl: "Wachtwoord vergeten?", es: "¿Olvidaste tu contraseña?", it: "Password dimenticata?", ru: "Забыли пароль?" },
  "Reset Password": { ar: "إعادة تعيين كلمة المرور", zh: "重置密码", ja: "パスワードリセット", de: "Passwort zurücksetzen", nl: "Wachtwoord resetten", es: "Restablecer contraseña", it: "Reimposta password", ru: "Сбросить пароль" },
  "Enter your email to receive a password reset link": { ar: "أدخل بريدك الإلكتروني لتلقي رابط إعادة تعيين كلمة المرور", zh: "输入您的邮箱以接收密码重置链接", ja: "パスワードリセットリンクを受け取るためにメールを入力", de: "Geben Sie Ihre E-Mail ein, um einen Passwort-Reset-Link zu erhalten", nl: "Voer uw e-mail in om een link voor wachtwoordreset te ontvangen", es: "Ingresa tu correo para recibir un enlace de restablecimiento", it: "Inserisci la tua email per ricevere un link di reset", ru: "Введите email для получения ссылки сброса пароля" },
  "Send Reset Link": { ar: "إرسال رابط إعادة التعيين", zh: "发送重置链接", ja: "リセットリンクを送信", de: "Reset-Link senden", nl: "Reset-link verzenden", es: "Enviar enlace de restablecimiento", it: "Invia link di reset", ru: "Отправить ссылку сброса" },
  "Or continue with": { ar: "أو تابع مع", zh: "或继续使用", ja: "または以下で続ける", de: "Oder fortfahren mit", nl: "Of ga verder met", es: "O continuar con", it: "Oppure continua con", ru: "Или продолжить с" },
  "Back to sign in": { ar: "العودة لتسجيل الدخول", zh: "返回登录", ja: "サインインに戻る", de: "Zurück zur Anmeldung", nl: "Terug naar inloggen", es: "Volver a iniciar sesión", it: "Torna all'accesso", ru: "Вернуться к входу" },
  "Don't have an account? Sign up": { ar: "ليس لديك حساب؟ سجل الآن", zh: "没有账户？注册", ja: "アカウントがない？サインアップ", de: "Noch kein Konto? Registrieren", nl: "Geen account? Registreren", es: "¿No tienes cuenta? Regístrate", it: "Non hai un account? Registrati", ru: "Нет аккаунта? Зарегистрируйтесь" },
  "Already have an account? Sign in": { ar: "لديك حساب؟ سجل الدخول", zh: "已有账户？登录", ja: "アカウントをお持ち？サインイン", de: "Bereits ein Konto? Anmelden", nl: "Al een account? Inloggen", es: "¿Ya tienes cuenta? Inicia sesión", it: "Hai già un account? Accedi", ru: "Уже есть аккаунт? Войти" },
  "Password reset email sent! Check your inbox.": { ar: "تم إرسال بريد إعادة تعيين كلمة المرور!", zh: "密码重置邮件已发送！", ja: "パスワードリセットメールを送信しました！", de: "Passwort-Reset-E-Mail gesendet!", nl: "Wachtwoord reset e-mail verzonden!", es: "¡Correo de restablecimiento enviado!", it: "Email di reset inviata!", ru: "Письмо для сброса отправлено!" },
  "Welcome back!": { ar: "مرحباً بعودتك!", zh: "欢迎回来！", ja: "おかえりなさい！", de: "Willkommen zurück!", nl: "Welkom terug!", es: "¡Bienvenido de nuevo!", it: "Bentornato!", ru: "С возвращением!" },
  "Account created! Welcome to FlavorAI!": { ar: "تم إنشاء الحساب! مرحباً بك!", zh: "账户创建成功！欢迎！", ja: "アカウント作成完了！ようこそ！", de: "Konto erstellt! Willkommen!", nl: "Account aangemaakt! Welkom!", es: "¡Cuenta creada! ¡Bienvenido!", it: "Account creato! Benvenuto!", ru: "Аккаунт создан! Добро пожаловать!" },
  "Authentication failed": { ar: "فشل المصادقة", zh: "认证失败", ja: "認証に失敗しました", de: "Authentifizierung fehlgeschlagen", nl: "Authenticatie mislukt", es: "Autenticación fallida", it: "Autenticazione fallita", ru: "Ошибка аутентификации" },

  // Recipes page
  "My Recipes": { ar: "وصفاتي", zh: "我的食谱", ja: "マイレシピ", de: "Meine Rezepte", nl: "Mijn recepten", es: "Mis recetas", it: "Le mie ricette", ru: "Мои рецепты" },
  "Manage all your saved recipes in one place": { ar: "إدارة جميع وصفاتك المحفوظة في مكان واحد", zh: "在一个地方管理所有保存的食谱", ja: "保存したレシピを一箇所で管理", de: "Verwalten Sie alle gespeicherten Rezepte an einem Ort", nl: "Beheer al uw opgeslagen recepten op één plek", es: "Gestiona todas tus recetas guardadas en un solo lugar", it: "Gestisci tutte le tue ricette salvate in un unico posto", ru: "Управляйте всеми сохраненными рецептами в одном месте" },
  "Search recipes...": { ar: "البحث عن وصفات...", zh: "搜索食谱...", ja: "レシピを検索...", de: "Rezepte suchen...", nl: "Recepten zoeken...", es: "Buscar recetas...", it: "Cerca ricette...", ru: "Поиск рецептов..." },
  "Filter by language": { ar: "تصفية حسب اللغة", zh: "按语言筛选", ja: "言語でフィルター", de: "Nach Sprache filtern", nl: "Filteren op taal", es: "Filtrar por idioma", it: "Filtra per lingua", ru: "Фильтр по языку" },
  "Clear": { ar: "مسح", zh: "清除", ja: "クリア", de: "Löschen", nl: "Wissen", es: "Limpiar", it: "Cancella", ru: "Очистить" },
  "No recipes found": { ar: "لم يتم العثور على وصفات", zh: "未找到食谱", ja: "レシピが見つかりません", de: "Keine Rezepte gefunden", nl: "Geen recepten gevonden", es: "No se encontraron recetas", it: "Nessuna ricetta trovata", ru: "Рецепты не найдены" },
  "No recipes yet": { ar: "لا توجد وصفات بعد", zh: "还没有食谱", ja: "レシピがまだありません", de: "Noch keine Rezepte", nl: "Nog geen recepten", es: "Aún no hay recetas", it: "Ancora nessuna ricetta", ru: "Рецептов пока нет" },
  "Try adjusting your filters": { ar: "جرب تعديل الفلاتر", zh: "尝试调整筛选条件", ja: "フィルターを調整してみてください", de: "Versuchen Sie, Ihre Filter anzupassen", nl: "Probeer uw filters aan te passen", es: "Intenta ajustar tus filtros", it: "Prova a modificare i filtri", ru: "Попробуйте изменить фильтры" },
  "Start creating delicious recipes!": { ar: "ابدأ بإنشاء وصفات لذيذة!", zh: "开始创建美味食谱！", ja: "美味しいレシピを作成しましょう！", de: "Beginnen Sie mit dem Erstellen köstlicher Rezepte!", nl: "Begin met het maken van heerlijke recepten!", es: "¡Comienza a crear recetas deliciosas!", it: "Inizia a creare ricette deliziose!", ru: "Начните создавать вкусные рецепты!" },
  "Clear Filters": { ar: "مسح الفلاتر", zh: "清除筛选", ja: "フィルターをクリア", de: "Filter löschen", nl: "Filters wissen", es: "Limpiar filtros", it: "Cancella filtri", ru: "Очистить фильтры" },
  "Create Your First Recipe": { ar: "أنشئ وصفتك الأولى", zh: "创建您的第一个食谱", ja: "最初のレシピを作成", de: "Erstellen Sie Ihr erstes Rezept", nl: "Maak uw eerste recept", es: "Crea tu primera receta", it: "Crea la tua prima ricetta", ru: "Создайте свой первый рецепт" },
  "Delete Recipe": { ar: "حذف الوصفة", zh: "删除食谱", ja: "レシピを削除", de: "Rezept löschen", nl: "Recept verwijderen", es: "Eliminar receta", it: "Elimina ricetta", ru: "Удалить рецепт" },
  "Are you sure you want to delete this recipe? This action cannot be undone.": { ar: "هل أنت متأكد من حذف هذه الوصفة؟ لا يمكن التراجع عن هذا الإجراء.", zh: "确定要删除此食谱吗？此操作无法撤销。", ja: "このレシピを削除してもよろしいですか？この操作は元に戻せません。", de: "Möchten Sie dieses Rezept wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.", nl: "Weet u zeker dat u dit recept wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.", es: "¿Estás seguro de que quieres eliminar esta receta? Esta acción no se puede deshacer.", it: "Sei sicuro di voler eliminare questa ricetta? Questa azione non può essere annullata.", ru: "Вы уверены, что хотите удалить этот рецепт? Это действие нельзя отменить." },
  "Recipe deleted successfully": { ar: "تم حذف الوصفة بنجاح", zh: "食谱删除成功", ja: "レシピが正常に削除されました", de: "Rezept erfolgreich gelöscht", nl: "Recept succesvol verwijderd", es: "Receta eliminada con éxito", it: "Ricetta eliminata con successo", ru: "Рецепт успешно удален" },
  "Failed to delete recipe": { ar: "فشل حذف الوصفة", zh: "删除食谱失败", ja: "レシピの削除に失敗しました", de: "Rezept konnte nicht gelöscht werden", nl: "Verwijderen van recept mislukt", es: "Error al eliminar la receta", it: "Eliminazione ricetta fallita", ru: "Не удалось удалить рецепт" },
  "Please sign in to view your recipes": { ar: "يرجى تسجيل الدخول لعرض وصفاتك", zh: "请登录查看您的食谱", ja: "レシピを表示するにはログインしてください", de: "Bitte melden Sie sich an, um Ihre Rezepte zu sehen", nl: "Log in om uw recepten te bekijken", es: "Inicia sesión para ver tus recetas", it: "Accedi per visualizzare le tue ricette", ru: "Войдите, чтобы просмотреть свои рецепты" },
  "All Languages": { ar: "جميع اللغات", zh: "所有语言", ja: "すべての言語", de: "Alle Sprachen", nl: "Alle talen", es: "Todos los idiomas", it: "Tutte le lingue", ru: "Все языки" },
  "Search:": { ar: "البحث:", zh: "搜索：", ja: "検索：", de: "Suche:", nl: "Zoeken:", es: "Buscar:", it: "Cerca:", ru: "Поиск:" },

  // Generate page (additional entries)
  "AI Recipe": { ar: "وصفة الذكاء الاصطناعي", zh: "AI食谱", ja: "AIレシピ", de: "KI-Rezept", nl: "AI-recept", es: "Receta IA", it: "Ricetta AI", ru: "ИИ-рецепт" },
  "Describe what you want to cook and let AI create a custom recipe": { ar: "صف ما تريد طهيه ودع الذكاء الاصطناعي يصنع وصفة مخصصة", zh: "描述您想做的菜，让AI为您创建定制食谱", ja: "作りたい料理を説明すると、AIがカスタムレシピを作成します", de: "Beschreiben Sie, was Sie kochen möchten, und lassen Sie die KI ein individuelles Rezept erstellen", nl: "Beschrijf wat u wilt koken en laat AI een aangepast recept maken", es: "Describe lo que quieres cocinar y deja que la IA cree una receta personalizada", it: "Descrivi cosa vuoi cucinare e lascia che l'AI crei una ricetta personalizzata", ru: "Опишите, что хотите приготовить, и ИИ создаст индивидуальный рецепт" },
  "What would you like to cook?": { ar: "ماذا تريد أن تطبخ؟", zh: "您想做什么菜？", ja: "何を作りたいですか？", de: "Was möchten Sie kochen?", nl: "Wat wilt u koken?", es: "¿Qué te gustaría cocinar?", it: "Cosa vorresti cucinare?", ru: "Что вы хотите приготовить?" },
  "E.g., A spicy pasta dish, Healthy breakfast bowl, Chocolate dessert...": { ar: "مثال: طبق مكرونة حار، وعاء إفطار صحي، حلوى شوكولاتة...", zh: "例如：辣味意面、健康早餐碗、巧克力甜点...", ja: "例：スパイシーなパスタ、ヘルシーな朝食ボウル、チョコレートデザート...", de: "Z.B. ein würziges Pastagericht, gesunde Frühstücksschale, Schokoladendessert...", nl: "Bijv. een pittig pastagerecht, gezonde ontbijtkom, chocoladedessert...", es: "Ej., Un plato de pasta picante, Tazón de desayuno saludable, Postre de chocolate...", it: "Es., Un piatto di pasta piccante, Ciotola per colazione sana, Dessert al cioccolato...", ru: "Например: острая паста, полезный завтрак, шоколадный десерт..." },
  "Recipe Language": { ar: "لغة الوصفة", zh: "食谱语言", ja: "レシピの言語", de: "Rezeptsprache", nl: "Recepttaal", es: "Idioma de la receta", it: "Lingua della ricetta", ru: "Язык рецепта" },
  "Select language": { ar: "اختر اللغة", zh: "选择语言", ja: "言語を選択", de: "Sprache auswählen", nl: "Taal selecteren", es: "Seleccionar idioma", it: "Seleziona lingua", ru: "Выберите язык" },
  "Cuisine Type (Optional)": { ar: "نوع المطبخ (اختياري)", zh: "菜系类型（可选）", ja: "料理タイプ（オプション）", de: "Küche (Optional)", nl: "Keukentype (optioneel)", es: "Tipo de cocina (opcional)", it: "Tipo di cucina (opzionale)", ru: "Тип кухни (необязательно)" },
  "Select cuisine": { ar: "اختر المطبخ", zh: "选择菜系", ja: "料理を選択", de: "Küche auswählen", nl: "Keuken selecteren", es: "Seleccionar cocina", it: "Seleziona cucina", ru: "Выберите кухню" },
  "Available Ingredients (Optional)": { ar: "المكونات المتاحة (اختياري)", zh: "可用食材（可选）", ja: "利用可能な食材（オプション）", de: "Verfügbare Zutaten (Optional)", nl: "Beschikbare ingrediënten (optioneel)", es: "Ingredientes disponibles (opcional)", it: "Ingredienti disponibili (opzionale)", ru: "Доступные ингредиенты (необязательно)" },
  "Add an ingredient...": { ar: "أضف مكونًا...", zh: "添加食材...", ja: "食材を追加...", de: "Zutat hinzufügen...", nl: "Ingrediënt toevoegen...", es: "Añadir un ingrediente...", it: "Aggiungi un ingrediente...", ru: "Добавить ингредиент..." },
  "Add": { ar: "إضافة", zh: "添加", ja: "追加", de: "Hinzufügen", nl: "Toevoegen", es: "Añadir", it: "Aggiungi", ru: "Добавить" },
  "Dietary Preferences (Optional)": { ar: "التفضيلات الغذائية (اختياري)", zh: "饮食偏好（可选）", ja: "食事の好み（オプション）", de: "Ernährungspräferenzen (Optional)", nl: "Dieetvoorkeuren (optioneel)", es: "Preferencias dietéticas (opcional)", it: "Preferenze alimentari (opzionale)", ru: "Диетические предпочтения (необязательно)" },
  "Recipe Category *": { ar: "فئة الوصفة *", zh: "食谱分类 *", ja: "レシピカテゴリー *", de: "Rezeptkategorie *", nl: "Receptcategorie *", es: "Categoría de receta *", it: "Categoria ricetta *", ru: "Категория рецепта *" },
  "Select a category": { ar: "اختر فئة", zh: "选择分类", ja: "カテゴリーを選択", de: "Kategorie auswählen", nl: "Categorie selecteren", es: "Seleccionar categoría", it: "Seleziona categoria", ru: "Выберите категорию" },
  "Generating Recipe...": { ar: "جاري إنشاء الوصفة...", zh: "正在生成食谱...", ja: "レシピを生成中...", de: "Rezept wird generiert...", nl: "Recept wordt gegenereerd...", es: "Generando receta...", it: "Generazione ricetta...", ru: "Создание рецепта..." },
  "Generate Recipe": { ar: "إنشاء الوصفة", zh: "生成食谱", ja: "レシピを生成", de: "Rezept generieren", nl: "Recept genereren", es: "Generar receta", it: "Genera ricetta", ru: "Создать рецепт" },
  "Please sign in to generate recipes": { ar: "يرجى تسجيل الدخول لإنشاء الوصفات", zh: "请登录以生成食谱", ja: "レシピを生成するにはログインしてください", de: "Bitte melden Sie sich an, um Rezepte zu generieren", nl: "Log in om recepten te genereren", es: "Inicia sesión para generar recetas", it: "Accedi per generare ricette", ru: "Войдите, чтобы создавать рецепты" },
  "Recipe generated successfully!": { ar: "تم إنشاء الوصفة بنجاح!", zh: "食谱生成成功！", ja: "レシピが正常に生成されました！", de: "Rezept erfolgreich generiert!", nl: "Recept succesvol gegenereerd!", es: "¡Receta generada con éxito!", it: "Ricetta generata con successo!", ru: "Рецепт успешно создан!" },
  "Failed to generate recipe": { ar: "فشل إنشاء الوصفة", zh: "生成食谱失败", ja: "レシピの生成に失敗しました", de: "Rezept konnte nicht generiert werden", nl: "Genereren van recept mislukt", es: "Error al generar la receta", it: "Generazione ricetta fallita", ru: "Не удалось создать рецепт" },
};

// Fast synchronous translation lookup
export function getStaticTranslation(text: string, lang: string): string {
  if (lang === "en") return text;
  return UI_TRANSLATIONS[text]?.[lang] || text;
}

// Batch translation lookup
export function getStaticTranslations(texts: string[], lang: string): Record<string, string> {
  if (lang === "en") {
    return texts.reduce((acc, text) => ({ ...acc, [text]: text }), {});
  }
  return texts.reduce((acc, text) => ({
    ...acc,
    [text]: UI_TRANSLATIONS[text]?.[lang] || text,
  }), {});
}

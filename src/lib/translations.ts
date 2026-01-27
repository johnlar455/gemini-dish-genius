// Static translations dictionary - no API calls needed for common UI text
export const UI_TRANSLATIONS: Record<string, Record<string, string>> = {
  // Navigation
  "Home": { ar: "الرئيسية", zh: "首页", ja: "ホーム", de: "Startseite", nl: "Home", es: "Inicio", it: "Home", ru: "Главная" },
  "Select Language": { ar: "اختر اللغة", zh: "选择语言", ja: "言語を選択", de: "Sprache auswählen", nl: "Taal selecteren", es: "Seleccionar idioma", it: "Seleziona lingua", ru: "Выбрать язык" },
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
  "Add Recipe": { ar: "إضافة وصفة", zh: "添加食谱", ja: "レシピを追加", de: "Rezept hinzufügen", nl: "Recept toevoegen", es: "Añadir receta", it: "Aggiungi ricetta", ru: "Добавить рецепт" },
  
  // Recipe Card
  "min": { ar: "دقيقة", zh: "分钟", ja: "分", de: "Min", nl: "min", es: "min", it: "min", ru: "мин" },
  "servings": { ar: "حصص", zh: "份", ja: "人前", de: "Portionen", nl: "porties", es: "porciones", it: "porzioni", ru: "порций" },
  "Please sign in to save favorites": { ar: "يرجى تسجيل الدخول لحفظ المفضلة", zh: "请登录以保存收藏", ja: "お気に入りを保存するにはログインしてください", de: "Bitte melden Sie sich an, um Favoriten zu speichern", nl: "Log in om favorieten op te slaan", es: "Inicia sesión para guardar favoritos", it: "Accedi per salvare i preferiti", ru: "Войдите, чтобы сохранить избранное" },
  "Removed from favorites": { ar: "تمت الإزالة من المفضلة", zh: "已从收藏中移除", ja: "お気に入りから削除しました", de: "Aus Favoriten entfernt", nl: "Verwijderd uit favorieten", es: "Eliminado de favoritos", it: "Rimosso dai preferiti", ru: "Удалено из избранного" },
  "Added to favorites": { ar: "تمت الإضافة إلى المفضلة", zh: "已添加到收藏", ja: "お気に入りに追加しました", de: "Zu Favoriten hinzugefügt", nl: "Toegevoegd aan favorieten", es: "Añadido a favoritos", it: "Aggiunto ai preferiti", ru: "Добавлено в избранное" },
  "Failed to update favorites": { ar: "فشل تحديث المفضلة", zh: "更新收藏失败", ja: "お気に入りの更新に失敗しました", de: "Favoriten-Aktualisierung fehlgeschlagen", nl: "Favorieten bijwerken mislukt", es: "Error al actualizar favoritos", it: "Aggiornamento preferiti fallito", ru: "Не удалось обновить избранное" },
  
  // Difficulty
  "Easy": { ar: "سهل", zh: "简单", ja: "簡単", de: "Einfach", nl: "Makkelijk", es: "Fácil", it: "Facile", ru: "Легко" },
  "Medium": { ar: "متوسط", zh: "中等", ja: "普通", de: "Mittel", nl: "Gemiddeld", es: "Medio", it: "Medio", ru: "Средне" },
  "Hard": { ar: "صعب", zh: "困难", ja: "難しい", de: "Schwer", nl: "Moeilijk", es: "Difícil", it: "Difficile", ru: "Difficile" },
  
  // Auth
  "Welcome Back": { ar: "مرحباً بعودتك", zh: "欢迎回来", ja: "おかえりなさい", de: "Willkommen zurück", nl: "Welkom terug", es: "Bienvenido de nuevo", it: "Bentornato", ru: "С возвращением" },
  "Sign in to continue": { ar: "سجل الدخول للمتابعة", zh: "登录以继续", ja: "続行するにはサインインしてください", de: "Melden Sie sich an, um fortzufahren", nl: "Log in om door te gaan", es: "Inicia sesión para continuar", it: "Accedi per continuare", ru: "Войдите, чтобы продолжить" },
  "Create Account": { ar: "إنشاء حساب", zh: "创建账户", ja: "アカウント作成", de: "Konto erstellen", nl: "Account aanmaken", es: "Crear cuenta", it: "Crea account", ru: "Создать аккаунт" },
  "Join our community": { ar: "انضم إلى مجتمعنا", zh: "加入我们的社区", ja: "コミュニティに参加", de: "Treten Sie unserer Community bei", nl: "Word lid van onze community", es: "Únete a nuestra comunidad", it: "Unisciti alla nostra community", ru: "Присоединяйтесь к нашему сообществу" },
  "Email": { ar: "البريد الإلكتروني", zh: "电子邮件", ja: "メール", de: "E-Mail", nl: "E-mail", es: "Correo electrónico", it: "Email", ru: "Электронная почта" },
  "Password": { ar: "كلمة المرور", zh: "密码", ja: "パスワード", de: "Passwort", nl: "Wachtwoord", es: "Contraseña", it: "Password", ru: "Пароль" },
  "Signing in...": { ar: "جاري تسجيل الدخول...", zh: "登录中...", ja: "サインイン中...", de: "Anmeldung...", nl: "Inloggen...", es: "Iniciando sesión...", it: "Accesso...", ru: "Вход..." },
  "Creating account...": { ar: "جاري إنشاء الحساب...", zh: "创建账户中...", ja: "アカウント作成中...", de: "Konto wird erstellt...", nl: "Account aanmaken...", es: "Creando cuenta...", it: "Creazione account...", ru: "Создание аккаунта..." },
  "Don't have an account?": { ar: "ليس لديك حساب؟", zh: "没有账户？", ja: "アカウントをお持ちでないですか？", de: "Noch kein Konto?", nl: "Nog geen account?", es: "¿No tienes cuenta?", it: "Non hai un account?", ru: "Нет аккаунта?" },
  "Already have an account?": { ar: "لديك حساب بالفعل؟", zh: "已有账户？", ja: "アカウントをお持ちですか？", de: "Bereits ein Konto?", nl: "Heb je al een account?", es: "¿Ya tienes cuenta?", it: "Hai già un account?", ru: "Уже есть аккаунт?" },
  
  // Recipe detail
  "Ingredients": { ar: "المكونات", zh: "食材", ja: "材料", de: "Zutaten", nl: "Ingrediënten", es: "Ingredientes", it: "Ingredienti", ru: "Ингредиенты" },
  "Instructions": { ar: "التعليمات", zh: "步骤", ja: "作り方", de: "Anleitung", nl: "Instructies", es: "Instrucciones", it: "Istruzioni", ru: "Инструкции" },
  "Prep Time": { ar: "وقت التحضير", zh: "准备时间", ja: "準備時間", de: "Vorbereitungszeit", nl: "Voorbereidingstijd", es: "Tiempo de preparación", it: "Tempo di preparazione", ru: "Время подготовки" },
  "Cook Time": { ar: "وقت الطهي", zh: "烹饪时间", ja: "調理時間", de: "Kochzeit", nl: "Kooktijd", es: "Tiempo de cocción", it: "Tempo di cottura", ru: "Время приготовления" },
  "Total Time": { ar: "الوقت الإجمالي", zh: "总时间", ja: "合計時間", de: "Gesamtzeit", nl: "Totale tijd", es: "Tiempo total", it: "Tempo totale", ru: "Общее время" },
  "Servings": { ar: "الحصص", zh: "份量", ja: "人数", de: "Portionen", nl: "Porties", es: "Porciones", it: "Porzioni", ru: "Порции" },
  "Difficulty": { ar: "الصعوبة", zh: "难度", ja: "難易度", de: "Schwierigkeit", nl: "Moeilijkheid", es: "Dificultad", it: "Difficoltà", ru: "Сложность" },
  "Cuisine": { ar: "المطبخ", zh: "菜系", ja: "料理", de: "Küche", nl: "Keuken", es: "Cocina", it: "Cucina", ru: "Кухня" },
  "Edit Recipe": { ar: "تعديل الوصفة", zh: "编辑食谱", ja: "レシピを編集", de: "Rezept bearbeiten", nl: "Recept bewerken", es: "Editar receta", it: "Modifica ricetta", ru: "Редактировать рецепт" },
  "Delete Recipe": { ar: "حذف الوصفة", zh: "删除食谱", ja: "レシピを削除", de: "Rezept löschen", nl: "Recept verwijderen", es: "Eliminar receta", it: "Elimina ricetta", ru: "Удалить рецепт" },
  "Share Recipe": { ar: "مشاركة الوصفة", zh: "分享食谱", ja: "レシピを共有", de: "Rezept teilen", nl: "Recept delen", es: "Compartir receta", it: "Condividi ricetta", ru: "Поделиться рецептом" },
  "Print Recipe": { ar: "طباعة الوصفة", zh: "打印食谱", ja: "レシピを印刷", de: "Rezept drucken", nl: "Recept afdrukken", es: "Imprimir receta", it: "Stampa ricetta", ru: "Распечатать рецепт" },
  "Translate to": { ar: "ترجمة إلى", zh: "翻译成", ja: "翻訳先", de: "Übersetzen in", nl: "Vertalen naar", es: "Traducir a", it: "Traduci in", ru: "Перевести на" },
  
  // Generate recipe
  "Generate Recipe": { ar: "إنشاء وصفة", zh: "生成食谱", ja: "レシピを生成", de: "Rezept generieren", nl: "Recept genereren", es: "Generar receta", it: "Genera ricetta", ru: "Создать рецепт" },
  "AI Recipe Generator": { ar: "مولد الوصفات بالذكاء الاصطناعي", zh: "AI食谱生成器", ja: "AIレシピジェネレーター", de: "KI-Rezeptgenerator", nl: "AI-receptgenerator", es: "Generador de recetas con IA", it: "Generatore di ricette AI", ru: "AI генератор рецептов" },
  "Enter ingredients or describe a dish": { ar: "أدخل المكونات أو صف طبقاً", zh: "输入食材或描述菜品", ja: "材料を入力するか料理を説明してください", de: "Zutaten eingeben oder Gericht beschreiben", nl: "Voer ingrediënten in of beschrijf een gerecht", es: "Ingresa ingredientes o describe un plato", it: "Inserisci ingredienti o descrivi un piatto", ru: "Введите ингредиенты или опишите блюдо" },
  "Generating...": { ar: "جاري الإنشاء...", zh: "生成中...", ja: "生成中...", de: "Generierung...", nl: "Genereren...", es: "Generando...", it: "Generazione...", ru: "Генерация..." },
  
  // Filters
  "All Categories": { ar: "جميع الفئات", zh: "所有分类", ja: "すべてのカテゴリー", de: "Alle Kategorien", nl: "Alle categorieën", es: "Todas las categorías", it: "Tutte le categorie", ru: "Все категории" },
  "All Cuisines": { ar: "جميع المطابخ", zh: "所有菜系", ja: "すべての料理", de: "Alle Küchen", nl: "Alle keukens", es: "Todas las cocinas", it: "Tutte le cucine", ru: "Все кухни" },
  "All Difficulties": { ar: "جميع المستويات", zh: "所有难度", ja: "すべての難易度", de: "Alle Schwierigkeiten", nl: "Alle moeilijkheden", es: "Todas las dificultades", it: "Tutte le difficoltà", ru: "Все сложности" },
  "Search recipes...": { ar: "ابحث عن وصفات...", zh: "搜索食谱...", ja: "レシピを検索...", de: "Rezepte suchen...", nl: "Recepten zoeken...", es: "Buscar recetas...", it: "Cerca ricette...", ru: "Поиск рецептов..." },
  
  // Common actions
  "Save": { ar: "حفظ", zh: "保存", ja: "保存", de: "Speichern", nl: "Opslaan", es: "Guardar", it: "Salva", ru: "Сохранить" },
  "Cancel": { ar: "إلغاء", zh: "取消", ja: "キャンセル", de: "Abbrechen", nl: "Annuleren", es: "Cancelar", it: "Annulla", ru: "Отмена" },
  "Delete": { ar: "حذف", zh: "删除", ja: "削除", de: "Löschen", nl: "Verwijderen", es: "Eliminar", it: "Elimina", ru: "Удалить" },
  "Edit": { ar: "تعديل", zh: "编辑", ja: "編集", de: "Bearbeiten", nl: "Bewerken", es: "Editar", it: "Modifica", ru: "Редактировать" },
  "Loading...": { ar: "جاري التحميل...", zh: "加载中...", ja: "読み込み中...", de: "Laden...", nl: "Laden...", es: "Cargando...", it: "Caricamento...", ru: "Загрузка..." },
  "No recipes found": { ar: "لم يتم العثور على وصفات", zh: "未找到食谱", ja: "レシピが見つかりません", de: "Keine Rezepte gefunden", nl: "Geen recepten gevonden", es: "No se encontraron recetas", it: "Nessuna ricetta trovata", ru: "Рецепты не найдены" },
  "No favorites yet": { ar: "لا توجد مفضلات بعد", zh: "暂无收藏", ja: "お気に入りはまだありません", de: "Noch keine Favoriten", nl: "Nog geen favorieten", es: "Aún no hay favoritos", it: "Ancora nessun preferito", ru: "Избранного пока нет" },
  
  // Profile
  "My Profile": { ar: "ملفي الشخصي", zh: "我的资料", ja: "マイプロフィール", de: "Mein Profil", nl: "Mijn profiel", es: "Mi perfil", it: "Il mio profilo", ru: "Мой профиль" },
  "Display Name": { ar: "الاسم المعروض", zh: "显示名称", ja: "表示名", de: "Anzeigename", nl: "Weergavenaam", es: "Nombre para mostrar", it: "Nome visualizzato", ru: "Отображаемое имя" },
  "Language": { ar: "اللغة", zh: "语言", ja: "言語", de: "Sprache", nl: "Taal", es: "Idioma", it: "Lingua", ru: "Язык" },
  "Update Profile": { ar: "تحديث الملف الشخصي", zh: "更新资料", ja: "プロフィールを更新", de: "Profil aktualisieren", nl: "Profiel bijwerken", es: "Actualizar perfil", it: "Aggiorna profilo", ru: "Обновить профиль" },
  "My Recipes": { ar: "وصفاتي", zh: "我的食谱", ja: "マイレシピ", de: "Meine Rezepte", nl: "Mijn recepten", es: "Mis recetas", it: "Le mie ricette", ru: "Мои рецепты" },
  
  // Footer
  "All rights reserved": { ar: "جميع الحقوق محفوظة", zh: "版权所有", ja: "全著作権所有", de: "Alle Rechte vorbehalten", nl: "Alle rechten voorbehouden", es: "Todos los derechos reservados", it: "Tutti i diritti riservati", ru: "Все права защищены" },
  "AI-powered recipe discovery and generation for home cooks everywhere.": { ar: "اكتشاف وإنشاء الوصفات بالذكاء الاصطناعي للطهاة المنزليين في كل مكان.", zh: "为各地家庭厨师提供AI驱动的食谱发现和生成。", ja: "あらゆる家庭料理人のためのAI搭載レシピ発見・生成。", de: "KI-gestützte Rezeptentdeckung und -generierung für Hobbyköche überall.", nl: "AI-gestuurde receptontdekking en -generatie voor thuiskoks overal.", es: "Descubrimiento y generación de recetas impulsados por IA para cocineros caseros en todas partes.", it: "Scoperta e generazione di ricette basate su IA per cuochi casalinghi ovunque.", ru: "Поиск и генерация рецептов на основе ИИ для домашних поваров повсюду." },
  "Explore": { ar: "استكشف", zh: "探索", ja: "探索", de: "Erkunden", nl: "Verkennen", es: "Explorar", it: "Esplora", ru: "Исследовать" },
  "Search Recipes": { ar: "ابحث عن وصفات", zh: "搜索食谱", ja: "レシピを検索", de: "Rezepte suchen", nl: "Recepten zoeken", es: "Buscar recetas", it: "Cerca ricette", ru: "Поиск рецептов" },
  "Cooking Guides": { ar: "دليل الطبخ", zh: "烹饪指南", ja: "料理ガイド", de: "Kochanleitungen", nl: "Kookgidsen", es: "Guías de cocina", it: "Guide di cucina", ru: "Руководства по готовке" },
  "About Us": { ar: "من نحن", zh: "关于我们", ja: "私たちについて", de: "Über uns", nl: "Over ons", es: "Sobre nosotros", it: "Chi siamo", ru: "О нас" },
  "Account": { ar: "الحساب", zh: "账户", ja: "アカウント", de: "Konto", nl: "Account", es: "Cuenta", it: "Account", ru: "Аккаунт" },
  "My Favorites": { ar: "مفضلاتي", zh: "我的收藏", ja: "お気に入り", de: "Meine Favoriten", nl: "Mijn favorieten", es: "Mis favoritos", it: "I miei preferiti", ru: "Мое избранное" },
  "Shopping Lists": { ar: "قوائم التسوق", zh: "购物清单", ja: "買い物リスト", de: "Einkaufslisten", nl: "Boodschappenlijsten", es: "Listas de compras", it: "Liste della spesa", ru: "Списки покупок" },
  "All rights reserved. Powered by AI.": { ar: "جميع الحقوق محفوظة. مدعوم بالذكاء الاصطناعي.", zh: "版权所有。由AI驱动。", ja: "全著作権所有。AIで駆動。", de: "Alle Rechte vorbehalten. Powered by AI.", nl: "Alle rechten voorbehouden. Powered by AI.", es: "Todos los derechos reservados. Impulsado por IA.", it: "Tutti i diritti riservati. Powered by AI.", ru: "Все права защищены. Работает на ИИ." },

  // Home page
  "Discover Your Next": { ar: "اكتشف مغامرتك", zh: "发现你的下一个", ja: "次の冒険を", de: "Entdecke dein nächstes", nl: "Ontdek je volgende", es: "Descubre tu próxima", it: "Scopri la tua prossima", ru: "Откройте ваше следующее" },
  "Culinary Adventure": { ar: "الطهوية القادمة", zh: "烹饪冒险", ja: "発見しよう", de: "kulinarisches Abenteuer", nl: "culinaire avontuur", es: "aventura culinaria", it: "avventura culinaria", ru: "кулинарное приключение" },
  "AI-powered recipe generation tailored to your taste, dietary preferences, and available ingredients": { ar: "إنشاء وصفات بالذكاء الاصطناعي مصممة حسب ذوقك وتفضيلاتك الغذائية والمكونات المتاحة", zh: "根据您的口味、饮食偏好和可用食材量身定制的AI食谱生成", ja: "あなたの好み、食事の好み、利用可能な食材に合わせたAIレシピ生成", de: "KI-gestützte Rezeptgenerierung, angepasst an Ihren Geschmack, Ernährungsvorlieben und verfügbare Zutaten", nl: "AI-gestuurde receptgeneratie afgestemd op uw smaak, dieetvoorkeuren en beschikbare ingrediënten", es: "Generación de recetas con IA adaptada a tu gusto, preferencias dietéticas e ingredientes disponibles", it: "Generazione di ricette AI su misura per i tuoi gusti, preferenze alimentari e ingredienti disponibili", ru: "Генерация рецептов с ИИ, адаптированная к вашему вкусу, диетическим предпочтениям и доступным ингредиентам" },
  "Search recipes or describe what you want to cook...": { ar: "ابحث عن وصفات أو صف ما تريد طهيه...", zh: "搜索食谱或描述您想做的菜...", ja: "レシピを検索するか、作りたい料理を説明してください...", de: "Rezepte suchen oder beschreiben Sie, was Sie kochen möchten...", nl: "Zoek recepten of beschrijf wat je wilt koken...", es: "Busca recetas o describe lo que quieres cocinar...", it: "Cerca ricette o descrivi cosa vuoi cucinare...", ru: "Ищите рецепты или опишите, что хотите приготовить..." },
  "Generate AI Recipe": { ar: "إنشاء وصفة بالذكاء الاصطناعي", zh: "生成AI食谱", ja: "AIレシピを生成", de: "KI-Rezept generieren", nl: "AI-recept genereren", es: "Generar receta con IA", it: "Genera ricetta AI", ru: "Создать рецепт с ИИ" },
  "Featured Recipes": { ar: "وصفات مميزة", zh: "精选食谱", ja: "おすすめレシピ", de: "Empfohlene Rezepte", nl: "Uitgelichte recepten", es: "Recetas destacadas", it: "Ricette in evidenza", ru: "Избранные рецепты" },
  "Explore our collection of AI-generated culinary delights": { ar: "استكشف مجموعتنا من الأطباق الشهية المولدة بالذكاء الاصطناعي", zh: "探索我们的AI生成美食合集", ja: "AI生成の料理コレクションをご覧ください", de: "Entdecken Sie unsere Sammlung von KI-generierten kulinarischen Köstlichkeiten", nl: "Ontdek onze collectie door AI gegenereerde culinaire hoogstandjes", es: "Explora nuestra colección de delicias culinarias generadas por IA", it: "Esplora la nostra collezione di delizie culinarie generate dall'IA", ru: "Исследуйте нашу коллекцию кулинарных шедевров, созданных ИИ" },
  "Loading delicious recipes...": { ar: "جاري تحميل الوصفات الشهية...", zh: "正在加载美味食谱...", ja: "美味しいレシピを読み込み中...", de: "Leckere Rezepte werden geladen...", nl: "Heerlijke recepten laden...", es: "Cargando deliciosas recetas...", it: "Caricamento ricette deliziose...", ru: "Загрузка вкусных рецептов..." },
  "No recipes yet. Be the first to create one!": { ar: "لا توجد وصفات بعد. كن أول من يصنع واحدة!", zh: "还没有食谱。成为第一个创建的人！", ja: "まだレシピがありません。最初のレシピを作成しましょう！", de: "Noch keine Rezepte. Sei der Erste, der eines erstellt!", nl: "Nog geen recepten. Wees de eerste die er een maakt!", es: "Aún no hay recetas. ¡Sé el primero en crear una!", it: "Ancora nessuna ricetta. Sii il primo a crearne una!", ru: "Рецептов пока нет. Будьте первым, кто создаст!" },
  "Generate Your First Recipe": { ar: "أنشئ وصفتك الأولى", zh: "生成您的第一个食谱", ja: "最初のレシピを生成", de: "Erstelle dein erstes Rezept", nl: "Genereer je eerste recept", es: "Genera tu primera receta", it: "Genera la tua prima ricetta", ru: "Создайте свой первый рецепт" },
  "Failed to load recipes": { ar: "فشل تحميل الوصفات", zh: "加载食谱失败", ja: "レシピの読み込みに失敗しました", de: "Rezepte konnten nicht geladen werden", nl: "Recepten laden mislukt", es: "Error al cargar recetas", it: "Caricamento ricette fallito", ru: "Не удалось загрузить рецепты" },

  // Favorites page
  "My Favorite Recipes": { ar: "وصفاتي المفضلة", zh: "我收藏的食谱", ja: "お気に入りのレシピ", de: "Meine Lieblingsrezepte", nl: "Mijn favoriete recepten", es: "Mis recetas favoritas", it: "Le mie ricette preferite", ru: "Мои любимые рецепты" },
  "Loading your favorites...": { ar: "جاري تحميل مفضلاتك...", zh: "正在加载您的收藏...", ja: "お気に入りを読み込み中...", de: "Ihre Favoriten werden geladen...", nl: "Je favorieten laden...", es: "Cargando tus favoritos...", it: "Caricamento dei preferiti...", ru: "Загрузка избранного..." },
  "No favorite recipes yet": { ar: "لا توجد وصفات مفضلة بعد", zh: "还没有收藏的食谱", ja: "お気に入りのレシピはまだありません", de: "Noch keine Lieblingsrezepte", nl: "Nog geen favoriete recepten", es: "Aún no hay recetas favoritas", it: "Ancora nessuna ricetta preferita", ru: "Избранных рецептов пока нет" },
  "Start exploring recipes and save your favorites!": { ar: "ابدأ باستكشاف الوصفات واحفظ مفضلاتك!", zh: "开始探索食谱并保存您的收藏！", ja: "レシピを探索してお気に入りを保存しましょう！", de: "Beginnen Sie mit der Erkundung von Rezepten und speichern Sie Ihre Favoriten!", nl: "Begin met het verkennen van recepten en sla je favorieten op!", es: "¡Comienza a explorar recetas y guarda tus favoritas!", it: "Inizia a esplorare le ricette e salva i tuoi preferiti!", ru: "Начните изучать рецепты и сохраняйте избранное!" },
  "Please sign in to view favorites": { ar: "يرجى تسجيل الدخول لعرض المفضلات", zh: "请登录查看收藏", ja: "お気に入りを見るにはログインしてください", de: "Bitte melden Sie sich an, um Favoriten anzuzeigen", nl: "Log in om favorieten te bekijken", es: "Inicia sesión para ver favoritos", it: "Accedi per visualizzare i preferiti", ru: "Войдите, чтобы просмотреть избранное" },

  // Search page
  "Search by name, cuisine, or ingredients...": { ar: "ابحث بالاسم أو المطبخ أو المكونات...", zh: "按名称、菜系或食材搜索...", ja: "名前、料理、または材料で検索...", de: "Nach Name, Küche oder Zutaten suchen...", nl: "Zoek op naam, keuken of ingrediënten...", es: "Buscar por nombre, cocina o ingredientes...", it: "Cerca per nome, cucina o ingredienti...", ru: "Поиск по названию, кухне или ингредиентам..." },
  "Searching recipes...": { ar: "جاري البحث عن وصفات...", zh: "正在搜索食谱...", ja: "レシピを検索中...", de: "Rezepte werden gesucht...", nl: "Recepten zoeken...", es: "Buscando recetas...", it: "Ricerca ricette...", ru: "Поиск рецептов..." },
  "Found": { ar: "تم العثور على", zh: "找到", ja: "見つかりました", de: "Gefunden", nl: "Gevonden", es: "Encontradas", it: "Trovate", ru: "Найдено" },
  "recipe": { ar: "وصفة", zh: "个食谱", ja: "レシピ", de: "Rezept", nl: "recept", es: "receta", it: "ricetta", ru: "рецепт" },
  "recipes": { ar: "وصفات", zh: "个食谱", ja: "レシピ", de: "Rezepte", nl: "recepten", es: "recetas", it: "ricette", ru: "рецептов" },
  "No recipes found for": { ar: "لم يتم العثور على وصفات لـ", zh: "未找到相关食谱", ja: "レシピが見つかりませんでした", de: "Keine Rezepte gefunden für", nl: "Geen recepten gevonden voor", es: "No se encontraron recetas para", it: "Nessuna ricetta trovata per", ru: "Рецепты не найдены для" },
  "Try a different search term.": { ar: "جرب مصطلح بحث مختلف.", zh: "请尝试其他搜索词。", ja: "別の検索語を試してください。", de: "Versuchen Sie einen anderen Suchbegriff.", nl: "Probeer een andere zoekterm.", es: "Prueba con otro término de búsqueda.", it: "Prova con un altro termine di ricerca.", ru: "Попробуйте другой поисковый запрос." },
  "Failed to search recipes": { ar: "فشل البحث عن الوصفات", zh: "搜索食谱失败", ja: "レシピの検索に失敗しました", de: "Rezeptsuche fehlgeschlagen", nl: "Recepten zoeken mislukt", es: "Error al buscar recetas", it: "Ricerca ricette fallita", ru: "Не удалось найти рецепты" },

  // Not Found
  "Page Not Found": { ar: "الصفحة غير موجودة", zh: "页面未找到", ja: "ページが見つかりません", de: "Seite nicht gefunden", nl: "Pagina niet gevonden", es: "Página no encontrada", it: "Pagina non trovata", ru: "Страница не найдена" },
  "Sorry, the page you are looking for doesn't exist.": { ar: "عذراً، الصفحة التي تبحث عنها غير موجودة.", zh: "抱歉，您查找的页面不存在。", ja: "申し訳ありませんが、お探しのページは存在しません。", de: "Entschuldigung, die gesuchte Seite existiert nicht.", nl: "Sorry, de pagina die je zoekt bestaat niet.", es: "Lo sentimos, la página que buscas no existe.", it: "Spiacenti, la pagina che stai cercando non esiste.", ru: "Извините, страница, которую вы ищете, не существует." },
  "Return Home": { ar: "العودة للرئيسية", zh: "返回首页", ja: "ホームに戻る", de: "Zurück zur Startseite", nl: "Terug naar home", es: "Volver al inicio", it: "Torna alla home", ru: "Вернуться на главную" },
  
  // Dietary
  "Vegetarian": { ar: "نباتي", zh: "素食", ja: "ベジタリアン", de: "Vegetarisch", nl: "Vegetarisch", es: "Vegetariano", it: "Vegetariano", ru: "Вегетарианское" },
  "Vegan": { ar: "نباتي صرف", zh: "纯素", ja: "ヴィーガン", de: "Vegan", nl: "Veganistisch", es: "Vegano", it: "Vegano", ru: "Веганское" },
  "Gluten-Free": { ar: "خالي من الغلوتين", zh: "无麸质", ja: "グルテンフリー", de: "Glutenfrei", nl: "Glutenvrij", es: "Sin gluten", it: "Senza glutine", ru: "Без глютена" },
  "Dairy-Free": { ar: "خالي من الألبان", zh: "无乳制品", ja: "乳製品不使用", de: "Laktosefrei", nl: "Lactosevrij", es: "Sin lácteos", it: "Senza latticini", ru: "Без молочных продуктов" },
  "Keto": { ar: "كيتو", zh: "生酮", ja: "ケト", de: "Keto", nl: "Keto", es: "Keto", it: "Keto", ru: "Кето" },
  "Low-Carb": { ar: "قليل الكربوهيدرات", zh: "低碳水", ja: "低糖質", de: "Low-Carb", nl: "Koolhydraatarm", es: "Bajo en carbohidratos", it: "A basso contenuto di carboidrati", ru: "Низкоуглеводное" },
  "Paleo": { ar: "باليو", zh: "古法饮食", ja: "パレオ", de: "Paleo", nl: "Paleo", es: "Paleo", it: "Paleo", ru: "Палео" },
  "Nut-Free": { ar: "خالي من المكسرات", zh: "无坚果", ja: "ナッツフリー", de: "Nussfrei", nl: "Notenvrij", es: "Sin frutos secos", it: "Senza frutta a guscio", ru: "Без орехов" },
};

/**
 * Get instant translation from static dictionary
 * Returns original text if no translation found
 */
export function getStaticTranslation(text: string, targetLanguage: string): string {
  if (targetLanguage === 'en') return text;
  return UI_TRANSLATIONS[text]?.[targetLanguage] || text;
}

/**
 * Translate multiple texts at once using static dictionary
 */
export function getStaticTranslations(texts: string[], targetLanguage: string): Record<string, string> {
  if (targetLanguage === 'en') {
    return texts.reduce((acc, text) => ({ ...acc, [text]: text }), {});
  }
  
  return texts.reduce((acc, text) => ({
    ...acc,
    [text]: UI_TRANSLATIONS[text]?.[targetLanguage] || text,
  }), {});
}

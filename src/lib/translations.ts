// Static translations dictionary - no API calls needed for common UI text
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

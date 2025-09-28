export const FILTER_OPTIONS = {
  // بنیادین (۰ تا ۶ سال)
  foundational: [
    {
      id: "kindergartens",
      label: "مهدهای کودک و مراکز بازی",
      filters: [
        { id: "kindergarten_count", label: "تعداد مهدهای کودک" },
        { id: "total_number_of_dedicated_mountaineering_environments", label: "تعداد مهدهای کودک" },
        { id: "kindergarten_area", label: "مساحت مهدهای کودک" },
        {
          id: "sports_kindergarten_count",
          label: "مهدهای کودک دارای فضای ورزشی",
        },
        {
          id: "sports_kindergarten_area",
          label: "مساحت مهدهای کودک دارای فضای ورزشی",
        },
        {
          id: "play_centers_count",
          label: "باشگاه‌های تخصصی بازی و ورزش کودک",
        },
        { id: "play_centers_area", label: "مساحت باشگاه‌های بازی و ورزش کودک" },
        {
          id: "child_sports_coaches",
          label: "تعداد مربیان تخصصی بازی و ورزش کودک",
        },
      ],
    },
    {
      id: "playgrounds",
      label: "زمین‌های بازی و خانه‌های بازی",
      filters: [
        { id: "play_houses_count", label: "تعداد خانه‌های بازی" },
        { id: "play_houses_area", label: "مساحت خانه‌های بازی" },
        { id: "play_houses_coaches", label: "مربیان فعال در خانه‌های بازی" },
        { id: "playgrounds_count", label: "تعداد زمین‌های بازی" },
        { id: "playgrounds_area", label: "مساحت زمین‌های بازی" },
        { id: "active_playgrounds", label: "زمین‌های بازی فعال" },
      ],
    },
  ],
  // تربیتی (استعداد یابی)
  educational: [
    {
      id: "schools",
      label: "مدارس",
      filters: [
        { id: "total_schools", label: "تعداد کل مدارس" },
        { id: "sports_schools_count", label: "مدارس دارای زیرساخت ورزشی" },
        { id: "sports_schools_area", label: "مساحت مدارس دارای زیرساخت ورزشی" },
        { id: "dynamic_yard_schools", label: "مدارس دارای حیاط پویا" },
        { id: "dynamic_yard_area", label: "مساحت حیاط‌های پویا" },
        {
          id: "elementary_sports_schools",
          label: "مدارس ابتدایی دارای زیرساخت",
        },
        { id: "secondary_sports_schools", label: "مدارس متوسطه دارای زیرساخت" },
      ],
    },
    {
      id: "school_sports",
      label: "فعالیت‌های ورزشی مدارس",
      filters: [
        {
          id: "student_sports_participation",
          label: "مشارکت دانش‌آموزان در ورزش",
        },
        { id: "sport_olympiad_medals", label: "مدال‌آوران المپیاد ورزشی" },
        {
          id: "sport_olympiad_participants",
          label: "شرکت‌کنندگان المپیاد ورزشی",
        },
        { id: "specialized_schools", label: "مدارس تخصصی ورزشی" },
      ],
    },
  ],
  // همگانی
  public: [
    {
      id: "parks_public_spaces",
      label: "پارک‌ها و فضاهای عمومی",
      filters: [
        { id: "park_area", label: "مساحت پارک‌های شهری" },
        {
          id: "parks_with_sports_equipment",
          label: "پارک‌های دارای تجهیزات ورزشی",
        },
        { id: "park_sports_area", label: "مساحت فضاهای ورزشی پارک‌ها" },
        { id: "hiking_trails", label: "محیط‌های اختصاصی کوهنوردی" },
      ],
    },
    {
      id: "cycling",
      label: "دوچرخه‌سواری",
      filters: [
        { id: "cycling_events", label: "رویدادهای دوچرخه‌سواری" },
        { id: "bike_rental_stations", label: "ایستگاه‌های کرایه دوچرخه" },
        { id: "bike_path_length", label: "طول مسیرهای ویژه دوچرخه" },
        { id: "cycling_coaches", label: "مربیان دوچرخه‌سواری" },
      ],
    },
    {
      id: "walking_fitness",
      label: "پیاده‌روی و تندرستی",
      filters: [
        { id: "walking_paths_length", label: "طول مسیرهای پیاده‌روی" },
        { id: "walking_events", label: "رویدادهای پیاده‌روی" },
        { id: "fitness_clubs", label: "باشگاه‌های عمومی و تندرستی" },
        { id: "fitness_visitors", label: "مراجعین باشگاه‌های تندرستی" },
      ],
    },
  ],
  // حرفه‌ای، قهرمانی
  professional: [
    {
      id: "athletes_coaches",
      label: "ورزشکاران و مربیان",
      filters: [
        { id: "organized_athletes", label: "بیمه‌شدگان ورزشی (سازمان‌یافته)" },
        { id: "disabled_athletes", label: "ورزشکاران معلول سازمان‌یافته" },
        {
          id: "national_team_athletes",
          label: "ورزشکاران دعوت شده به تیم ملی",
        },
        { id: "total_coaches", label: "مجموع مربیان ورزشی" },
        { id: "total_referees", label: "مجموع داوران ورزشی" },
      ],
    },
    {
      id: "coaches_levels",
      label: "سطح‌بندی مربیان",
      filters: [
        { id: "international_coaches", label: "مربیان درجه بین‌المللی" },
        { id: "grade1_coaches", label: "مربیان درجه یک" },
        { id: "grade2_coaches", label: "مربیان درجه دو" },
        { id: "grade3_coaches", label: "مربیان درجه سه" },
      ],
    },
    {
      id: "referees_levels",
      label: "سطح‌بندی داوران",
      filters: [
        { id: "international_referees", label: "داوران درجه بین‌المللی" },
        { id: "grade1_referees", label: "داوران درجه یک" },
        { id: "grade2_referees", label: "داوران درجه دو" },
        { id: "grade3_referees", label: "داوران درجه سه" },
      ],
    },
    {
      id: "competitions",
      label: "مسابقات و رویدادها",
      filters: [
        { id: "international_competitions", label: "مسابقات بین‌المللی" },
        { id: "national_competitions", label: "مسابقات کشوری" },
        { id: "provincial_competitions", label: "مسابقات استانی" },
        { id: "total_competitions", label: "کل مسابقات برگزار شده" },
      ],
    },
    {
      id: "sports_capacity",
      label: "ظرفیت‌های ورزشی",
      filters: [
        { id: "medal_potential_sports", label: "رشته‌های با ظرفیت مدال‌آوری" },
        { id: "popular_sports", label: "رشته‌های محبوب مردمی" },
        { id: "infrastructure_sports", label: "رشته‌های با زیرساخت موجود" },
        {
          id: "private_investment_sports",
          label: "رشته‌های با سرمایه‌گذاری خصوصی",
        },
      ],
    },
  ],
};

export const MAIN_CATEGORIES = [
  { id: "foundational", label: "بنیادین (۰ تا ۶ سال)", icon: "👶" },
  { id: "educational", label: "تربیتی (استعداد یابی)", icon: "🎓" },
  { id: "public", label: "همگانی", icon: "👥" },
  { id: "professional", label: "حرفه‌ای، قهرمانی (مدال آوری)", icon: "🏆" },
];

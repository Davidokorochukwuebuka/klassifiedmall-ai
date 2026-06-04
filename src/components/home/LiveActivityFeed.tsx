'use client';

const activities = [
  '🛒 John just bought Fresh Tomatoes from FreshFarms',
  '🏪 New vendor "StyleBox" joined the platform',
  '💰 ₦50K funded for "School Supplies for Kids"',
  '🚚 Driver Emeka completed 10 deliveries today',
  '⭐ Chef Amara received a 5-star review',
  '📦 TechHub Lagos shipped 50 orders this week',
  '🎓 200 students enrolled in "Digital Marketing 101"',
  '💜 ₦100K donated to "Feed the Community" campaign',
];

export default function LiveActivityFeed() {
  return (
    <section className="py-4 bg-primary/5 dark:bg-primary/10 overflow-hidden border-y border-primary/10">
      <div className="flex animate-ticker whitespace-nowrap">
        {[...activities, ...activities].map((activity, i) => (
          <span key={i} className="inline-block px-8 text-sm text-gray-700 dark:text-gray-300">
            {activity}
          </span>
        ))}
      </div>
    </section>
  );
}


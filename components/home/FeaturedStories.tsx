import InterviewCard from '@/components/interviews/InterviewCard';

export default function FeaturedStories({ stories }) {
  if (stories.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '64px 0' }}>
        <p style={{ color: '#9A9DA5' }}>No interviews published yet.</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '20px' }}
      className='sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {stories.map((story) => (
        <InterviewCard key={story.id} interview={story} />
      ))}
    </div>
  );
}

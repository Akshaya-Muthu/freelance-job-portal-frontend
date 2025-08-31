import { motion } from 'framer-motion';

import user1 from '../assets/user1.jpg';
import user2 from '../assets/user2.jpg';
import user3 from '../assets/user3.jpg';

const testimonials = [
  {
    name: 'Jake Thompson',
    role: 'Freelancer / Data Analyst',
    feedback: 'JobPort connected me to my dream job effortlessly. Highly recommended!',
    image: user1,
  },
  {
    name: 'Olivia Brooks',
    role: 'Freelancer / UI/UX Designer',
    feedback: 'We consistently find top talent through JobPort. Smooth and reliable!',
    image: user2,
  },
  {
    name: 'Ryan Mitchell',
    role: 'Freelancer / Full-Stack Developer',
    feedback: 'As a freelancer, JobPort gave me visibility and great client connections.',
    image: user3,
  },
];


 export const Testimonials = () => {
  return (
    <section className="py-20 bg-transparent text-white text-center">
      <h2 className="text-3xl font-bold mb-12">What our users say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            className="bg-gray-900 p-6 rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col items-center gap-4">
              <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full object-cover" />
              <h4 className="text-lg font-semibold">{t.name}</h4>
              <p className="text-sm text-gray-400 italic">{t.role}</p>
              <p className="text-sm text-gray-300 mt-2">"{t.feedback}"</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
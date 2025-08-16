import { motion } from 'framer-motion';
import { Button as RainbowButton } from '@/components/ui/rainbow-borders-button';
import { CircularTestimonials } from '@/components/ui/circular-testimonials';

const MyExperience = () => {
	// Testimonials data from Hero section
	const testimonials = [
		{
			quote: "Sai is an exceptional developer with deep expertise in cybersecurity and modern web technologies. His attention to detail and innovative solutions are outstanding.",
			name: "Tech Lead",
			designation: "Senior Developer",
			src: "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
		{
			quote: "Working with Sai was a game-changer for our project. His UI/UX skills and frontend expertise brought our vision to life with stunning results.",
			name: "Project Manager",
			designation: "Product Lead",
			src: "https://images.unsplash.com/photo-1628749528992-f5702133b686?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
		},
		{
			quote: "Sai's cybersecurity knowledge and AI/ML implementations are cutting-edge. He consistently delivers high-quality, secure solutions that exceed expectations.",
			name: "Security Expert",
			designation: "Cybersecurity Specialist",
			src: "https://images.unsplash.com/photo-1524267213992-b76e8577d046?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
		},
	];

	return (
			<section id="experience" className="relative min-h-screen w-full">
				<div className="max-w-7xl mx-auto py-1 px-1 md:px-2 lg:px-3">
					{/* Section Title - Centered overall */}
					<motion.h2
						initial={{ opacity: 0, y: -40 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: '-100px' }}
						transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
						className="font-display text-3xl md:text-4xl text-center text-white absolute top-16 left-1/2 transform -translate-x-1/2 z-20"
					>
						My Experience
					</motion.h2>

					<div className="flex min-h-screen w-full pt-32">
					{/* Left side - White background (30%) */}
					<div className="w-[40%] bg-white flex flex-col items-center justify-center p-8">
					{/* Photo Placeholder */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
						className="w-48 h-64 bg-gray-200 rounded-2xl border-2 border-gray-300 flex items-center justify-center shadow-lg"
					>
						<div className="text-gray-500 text-center">
							<div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
								<svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
									<path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
								</svg>
							</div>
							<p className="text-sm font-medium">Photo Placeholder</p>
						</div>
					</motion.div>
				</div>

				{/* Right side - Grey background (70%) */}
				<div className="w-[60%] bg-gray-800 flex items-center justify-end p-8 relative">
					{/* Glass Morphism Cards - Positioned to the right */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
						className="max-w-2xl w-full"
					>
						<CircularTestimonials
							testimonials={testimonials}
							autoplay={true}
							colors={{
								name: "#f7f7ff",
								designation: "#e1e1e1",
								testimony: "#f1f1f7",
								arrowBackground: "#0582CA",
								arrowForeground: "#141414",
								arrowHoverBackground: "#f7f7ff",
							}}
							fontSizes={{
								name: "24px",
								designation: "16px",
								quote: "16px",
							}}
						/>
					</motion.div>

				</div>
			</div>
			</div>
		</section>
	);
};

export default MyExperience;



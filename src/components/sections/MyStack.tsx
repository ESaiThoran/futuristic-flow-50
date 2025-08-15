import { motion } from 'framer-motion';
import Component from '@/components/ui/glass-icons';
import {
	FiLayout,
	FiEdit,
	FiCpu,
	FiShield,
	FiLock,
	FiTrendingUp,
	FiLayers,
	FiTool,
} from 'react-icons/fi';
import {
	SiC,
	SiCplusplus,
	SiPython,
	SiPhp,
	SiMysql,
	SiHtml5,
	SiCss3,
	SiJavascript,
	SiAngular,
	SiFigma,
	SiAdobexd,
	SiSketch,
} from 'react-icons/si';

const programmingItems = [
	{ icon: <SiC />, color: 'blue', label: 'C' },
	{ icon: <SiCplusplus />, color: 'purple', label: 'C++' },
	{ icon: <SiPython />, color: 'red', label: 'Python' },
	{ icon: <SiPhp />, color: 'indigo', label: 'PHP' },
	{ icon: <SiMysql />, color: 'orange', label: 'SQL' },
	{ icon: <SiHtml5 />, color: 'green', label: 'HTML' },
	{ icon: <SiCss3 />, color: 'pink', label: 'CSS' },
	{ icon: <SiJavascript />, color: 'teal', label: 'JavaScript' },
];

const skillsItems = [
	{ icon: <FiLayout />, color: 'blue', label: 'Frontend development' },
	{ icon: <FiEdit />, color: 'purple', label: 'UI/UX' },
	{ icon: <FiCpu />, color: 'red', label: 'Operating Systems' },
	{ icon: <FiShield />, color: 'indigo', label: 'Penetration Testing' },
	{ icon: <FiLock />, color: 'orange', label: 'Cryptography' },
	{ icon: <FiTrendingUp />, color: 'green', label: 'Data Analysis' },
	{ icon: <FiLayers />, color: 'pink', label: 'SEPM' },
	{ icon: <FiTool />, color: 'teal', label: 'DevOps' },
];

const toolsItems = [
	{ icon: <SiFigma />, color: 'blue', label: 'Figma' },
	{ icon: <SiAdobexd />, color: 'purple', label: 'Adobe XD' },
	{ icon: <SiSketch />, color: 'red', label: 'Sketch' },
];

const MyStack = () => {
	return (
		<section id="stack" className="relative py-24 px-12 md:px-24"> {/* left + right padding */}
			<div className="container">
				<motion.h2
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="font-display text-4xl md:text-5xl mb-8 text-center"
				>
					My Stack 
				</motion.h2>

				<div className="space-y-12">
					<div>
						<h3 className="text-xl font-semibold mb-4">Programming</h3>
						<Component items={programmingItems} />
					</div>

					<div>
						<h3 className="text-xl font-semibold mb-4">Skills</h3>
						<Component items={skillsItems} />
					</div>

					<div>
						<h3 className="text-xl font-semibold mb-4">Tools</h3>
						<Component items={toolsItems} />
					</div>
				</div>
			</div>

			<div className="pointer-events-none absolute inset-0" aria-hidden>
				<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[40rem] w-[40rem] rounded-full blur-3xl opacity-10" style={{ background: 'var(--gradient-primary)' }} />
			</div>
		</section>
	);
};

export default MyStack;

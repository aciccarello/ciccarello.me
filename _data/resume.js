// @ts-check

/** @typedef Experience
 * @property {string} companyName
 * @property {string} [companyUrl] Link to company website
 * @property {string} position Job title
 * @property {string} location Geographic location (or "Remote")
 * @property {Date} startDate Date object of start (month approximation)
 * @property {Date} [endDate] Date object of start (month approximation)
 * @property {string} [durationText] Override of the default years/months text
 * @property {string} summary 1 or 2 sentence summary of the work involved
 * @property {string[]} achievements Individual bullet points
 * @property {string[]} [moreAchievements] Individual bullet points that are hidden in concise view
 * @property {string[]} [skills] List of skills used
 */

/** @type {Experience[]} */
const experience = [
	{
		companyName: 'Tradeweb (ICD)',
		companyUrl: 'https://icdportal.com/',
		position: 'Director, Software Engineering',
		location: 'Remote',
		startDate: new Date('2026-04-01'),
		summary:
			'(Promotion) Full-stack development of ICD Portal investment platform.',
		achievements: [
			'Owned delivery of new financial product trading on ICD platform.',
			'Led cross-team working groups to improve software delivery coordination and minimize delays across 5 teams.',
			'Represented a team of 5 engineers in executive meetings alongside my manager.',
			'Migrated CI/CD pipelines of Docker images to GitHub Actions Workflows, AWS ECR, and ArgoCD.',
			'Pioneered integration of AI tools into company development workflow to improve productivity and code quality.',
		],
		moreAchievements: [
			'Improved automated testing coverage and spearheaded use of new testing frameworks.',
			'Set up new Grafana dashboards and alerting for production monitoring.',
		],
		skills: [
			'AWS EventBridge',
			'RDS Aurora',
			'Python',
			'Pulumi',
			'Infrastructure as Code',
			'Java',
			'Git',
			'Agile',
			'Scrum',
			'Microservices',
			'REST',
			'Spring',
			'PostgreSQL',
			'Oracle SQL',
			'Automated Testing',
			'Playwright',
			'Claude Code',
			'Copilot',
			'Groovy',
			'Node.js',
			'React',
			'TypeScript',
			'Jest',
		],
	},
	{
		companyName: 'Tradeweb (ICD)',
		companyUrl: 'https://icdportal.com/',
		position: 'Vice President, Software Engineering',
		location: 'Remote',
		startDate: new Date('2023-05-08'),
		summary: 'Full-stack development of ICD Portal investment platform.',
		achievements: [
			'Led technical design and development of new financial product architecture integrating with 3 external systems.',
			'Helped the team revamp Agile processes and consulted on setup of Jira project management.',
			'Led migration of existing codebase to TypeScript.',
		],
		moreAchievements: [
			'Created web app to view automation testing result logs.',
		],
		skills: [
			'React',
			'JavaScript',
			'Node.js',
			'Java',
			'Git',
			'Agile',
			'Scrum',
			'Microservices',
			'REST',
			'AWS EventBridge',
			'RDS Aurora',
			'Groovy',
			'Python',
			'Pulumi',
			'Spring',
			'Oracle SQL',
			'PostgreSQL',
			'Automated Testing',
		],
	},
	{
		companyName: 'SitePen',
		companyUrl: 'https://www.sitepen.com/',
		position: 'Software Engineer',
		location: 'Remote',
		startDate: new Date('2018-08-21'),
		endDate: new Date('2023-04-28'),
		summary:
			'Full-stack software development and consulting work on cross-functional teams for multiple clients. Primarily focused on JavaScript/TypeScript development.',
		achievements: [
			'Acted as team lead on Angular application development for a financial services corporation.',
			'Implemented a main page redesign with the team and developed interactive React components for service cross-selling in a major online accounting application.',
			'Built back-end services with AWS Lambda, DynamoDB, and Elastic Beanstalk using Express.js and Java Spring.',
			'Led test automation implementation and 6-month junior developer coaching program.',
		],
		moreAchievements: [
			'Helped deliver a business management platform using Dojo 2 and a Nest.js backend.',
		],
		skills: [
			'Angular',
			'React',
			'JavaScript',
			'TypeScript',
			'AWS Lambda',
			'DynamoDB',
			'Elastic Beanstalk',
			'Node.js',
			'SCSS',
			'Git',
			'Agile',
			'Scrum',
			'Java',
			'Spring',
			'REST',
			'Express.js',
			'Nest.js',
			'Team Leadership',
			'Coaching',
			'A/B Testing',
			'CI/CD',
			'Jenkins',
			'Atlassian',
		],
	},
	{
		companyName: 'DISH Network',
		companyUrl: 'https://www.dish.com/',
		position: 'Software Engineer',
		location: 'Denver, CO',
		startDate: new Date('2018-05-15'),
		endDate: new Date('2018-08-15'),
		summary: 'Contract position with central customer data API team.',
		achievements: [
			'Developed Java REST API microservices using Spring Boot in an <abbr title="Extreme Programming">XP</abbr>/<abbr title="Test-Driven Development">TDD</abbr> environment.',
			'Helped inform API and architectural designs for the development team.',
		],
		moreAchievements: [
			'Started regular team discussions on how to improve team processes and designs.',
		],
		skills: [
			'Java',
			'Spring',
			'REST',
			'MongoDB',
			'TDD',
			'Extreme Programming',
			'Agile',
			'Rally',
			'Maven',
		],
	},
	{
		companyName: 'Teradata',
		companyUrl: 'https://www.teradata.com/',
		position: 'Software/Sys Eng Anlyst, IT Services',
		location: 'Dayton, OH/Remote',
		startDate: new Date('2014-06-15'),
		endDate: new Date('2018-04-15'),
		summary:
			'Developed and maintained internal HR applications for 10,000 employee company. Applications I helped maintain included payroll, sales compensation, and benefits tools.',
		achievements: [
			'Designed and led new AngularJS/ag-grid web application deployment/testing.',
			'Developed Java Spring and Oracle SQL database backend.',
		],
		moreAchievements: ['Supported legacy JSP and Classic ASP pages'],
		skills: [
			'AngularJS',
			'ag-grid',
			'Java',
			'Spring',
			'Bootstrap',
			'Oracle SQL',
			'JSP',
			'Classic ASP',
		],
	},
	{
		companyName: 'Covenant Kitchens & Baths',
		companyUrl: 'https://www.covenantkitchens.com/',
		position: 'Web Developer/Systems Technician/CAD Draftsman',
		location: 'Westbrook, CT/Remote',
		startDate: new Date('2011-05-15'),
		endDate: new Date('2021-01-15'),
		summary:
			'Range of technical work for a kitchen and bath design firm. CAD drafting in person and web administration later as a freelancer.',
		achievements: [
			'Completed a website revamp and performed G-Suite administration and SEO optimization.',
		],
		moreAchievements: [
			'Produced 2D & 3D drawings in AutoCAD and SketchUp.',
			'Transferred the email system to Google Apps.',
			'Provided website and technical support on a contract basis.',
		],
		skills: [
			'Web design',
			'System Administration',
			'SEO',
			'GSuite',
			'AutoCAD',
			'SketchUp',
		],
	},
	{
		companyName: 'Alstom Power',
		position:
			'Information Systems Coordinator/Business Intelligence Intern',
		location: 'Hartford, CT',
		startDate: new Date('2012-07-15'),
		endDate: new Date('2013-08-15'),
		durationText: 'Summers',
		summary:
			'Summer internship with the business intelligence team of a multinational company.',
		achievements: [
			'Automated manual data entry into SAP using VBScript, speeding up migration.',
		],
		skills: [
			'SAP',
			'BusinessObjects',
			'Hyperion',
			'Excel Macros',
			'VBScript',
		],
	},
];

export default {
	summary: `
		Lead Software Engineer with 10+ years of experience building modern full-stack development architectures in cloud and on-premises environments.
		Proven track record leading cross-functional teams, owning architectural decisions, and mentoring junior developers.
		Knowledgeable in development best practices, automated testing, and agile methodologies.
		Seeking a remote full-stack engineering role where I can help build a culture of delivering high-quality web applications across technologies.
	`,
	topSkills: [
		'Agile',
		'Infrastructure as Code',
		'Java',
		'Spring',
		'AWS',
		'TypeScript',
		'React',
		'Software Architecture',
		'Automated Testing',
		'Git',
	],
	allSkills: Array.from(new Set(experience.map(({ skills }) => skills))),
	recentCompanies: Array.from(
		new Set(experience.map(({ companyName }) => companyName)),
	),
	experience,
	personal: [
		'Passionate about accessibility and evolving web standards.',
		'Member of the <a href="https://indieweb.org">IndieWeb</a> community working on interoperable, personal websites via shared standards.',
		'Maintainer of the <a href="https://omnibear.com/">Omnibear</a> browser extension and previously a maintainer of the <a href="https://typedoc.org/">TypeDoc</a> open source npm package.',
		'Spent 6 months traveling around Latin America learning Spanish.',
		'Enjoys <a href="/birds/">birding</a>, gardening, and playing disc sports.',
	],
};

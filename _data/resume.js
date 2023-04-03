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
		companyName: 'SitePen',
		companyUrl: 'https://www.sitepen.com/',
		position: 'Software Engineer',
		location: 'Remote',
		startDate: new Date('2018-08-21'),
		summary:
			'Full-stack Software development and consulting work on cross-functional teams for multiple clients. Primarily focused on JavaScript/TypeScript development.',
		achievements: [
			'Acted as team lead on Angular application development for a financial services corporation.',
			'Implemented main page redesign with team and developed interactive React components for service cross-selling in major online accounting application',
			'Worked on and with AWS Lambda, DynamoDB, and Elastic Beanstalk back-ends using Express.js and Java Spring.',
			'Lead test automation implementation and 6-month junior developer coaching program.',
		],
		moreAchievements: [
			'Helped deliver a business management platform using Dojo 2 and a Nest.js backend',
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
			'Developed Java REST API microservices using Spring Boot in <abbr title="Extreme Programming">XP</abbr>/<abbr title="Test-Driven Development">TDD</abbr> environment',
			'Helped inform API and architectural designs for development team',
		],
		moreAchievements: [
			'Started regular team discussion on how to improve team processes and designs',
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
			'Designed and lead new AngularJS/ag-grid web application deployment/testing',
			'Developed Java Spring and Oracle SQL database backend',
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
			'Range of technical work for Kitchen & Bath design firm. CAD Drafting in-person and web administration later as freelance.',
		achievements: [
			'Completed website revamp and performed G-Suite administration and SEO optimization',
		],
		moreAchievements: [
			'Produced 2D & 3D drawings in AutoCAD and SketchUp',
			'Transferred email system to Google Apps',
			'Provided website and technical support on a contract basis',
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
			'Automated manual data entry into SAP using VBScript, speeding up migration',
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

module.exports = {
	summary: `
		Software Engineer experienced in modern JavaScript front-end frameworks and back-end REST APIs.
		Knowledgeable in development best practices, automated testing, and agile methodologies.
		Seeking a remote front end or full stack engineer position building high-quality websites regardless of technology.
	`,
	topSkills: [
		'JavaScript',
		'TypeScript',
		'Angular',
		'React',
		'Java',
		'HTML5',
		'CSS',
		'Node.js',
		'AWS',
		'Maven',
		'Git',
		'Automated Testing',
	],
	allSkills: Array.from(new Set(experience.map(({ skills }) => skills))),
	experience,
	personal: [
		'Passionate about accessibility and evolving web standards',
		'Member of the <a href="https://indieweb.org">IndieWeb</a> community working on interoperable, personal websites.',
		'Was a maintainer of the TypeDoc Open Source npm package',
		'Spent 6 months traveling around Latin America learning Spanish.',
		'Enjoys <a href="/posts/tags/birds/">birding</a>, gardening and playing disc sports',
	],
};

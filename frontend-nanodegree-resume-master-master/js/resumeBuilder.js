var bio = {
	"name" : "Wenbo Yu",
	"role" : "Front-End Web Developer",
	"bioPic" : "images/zjz.jpg",
	"contacts" : {
		"mobile" : "647-459-4333",
		"email" : "wenboyu2208@gmail.com",
		"github" : "abryu",
		"twitter" : "@abryu0822",
		"location" : "Toronto, ON"
	},
	"welcomeMessage" : "Hello! I am enrolleing in York University Information Technology major and looking for a position of Front-End Web Developer.",
	"skills" : ["HTML", "CSS", "Javascript", "Java", "Python"],
	"display" : function(){
		var formattedName = HTMLheaderName.replace("%data%", bio.name);
		var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
		var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
		var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
		var formattedGitHub = HTMLgithub.replace("%data%", bio.contacts.github);
		var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);
		var formattedBioPic = HTMLbioPic.replace("%data%", bio.bioPic)
		var formattedWelcome = HTMLWelcomeMsg.replace("%data%", bio.welcomeMessage)

	 	$("#header").prepend(formattedRole)
					.prepend(formattedName)
					.append(formattedBioPic)
					.append(formattedWelcome)
					.append(formattedSkills);

		$("#topContacts").append(formattedMobile)
						 .append(formattedEmail)
						 .append(formattedGitHub)
						 .append(formattedLocation);

		$("#footerContacts").append(formattedMobile)
				 .append(formattedEmail)
				 .append(formattedGitHub)
				 .append(formattedLocation);

		if (bio.skills.length > 0) {
		            $('#header').append(HTMLskillsStart);
		            for (skill in bio.skills) {
		                var formattedSkills = HTMLskills.replace("%data%", bio.skills[skill]);
		                $('#skills').append(formattedSkills);
		            }
		}
	}
};

var projects = {
	"projects": [
		{
			"title": "Online Learning Project",
			"dates": "March 2015",
			"description": "Data process and automation integration by using Moodle, MySQL.",
		}

	],
	"display" : function () {
		for (project in projects.projects) {
		$("#projects").append(HTMLprojectStart);

		var formattedProjectTitle = HTMLprojectTitle.replace("%data%", projects.projects[project].title);
		$(".project-entry:last").append(formattedProjectTitle);

		var formattedProjectDates = HTMLprojectDates.replace("%data%", projects.projects[project].dates);
		$(".project-entry:last").append(formattedProjectDates);

		var formattedProjectDescription = HTMLprojectDescription.replace("%data%", projects.projects[project].description);
		$(".project-entry:last").append(formattedProjectDescription);	
		}
	}
};


var education = {
    "schools": [
        {
            "name": "York University",
            "location": "Toronto, ON",
            "degree": "Bachelor of Arts",
            "major": "Information Technology",
            "dates": " Sept. 2013 to Present",
            "url": "http://www.yorku.ca/index.html"
        },
        {
        	"name": "Shandong Jianzhu University",
            "location": "Jinan, China",
            "degree": "Diploma",
            "major": "International Business",
            "dates": "2010-2013",
            "url": "http://www.sdjzu.edu.cn/index.php"
        }
    ],
    "onlineCourses" : [
   		{
   			"title" : "Front-End Web Developer Nanodegree",
   			"school" : "Udacity",
    		"dates" : "2015",
   			"url": "http://www.udacity.com"
   		},
   		{
   			"title" : "Analytics Certification",
   			"school" : "Google",
    		"dates" : "November 2014",
   			"url": "http://www.google.ca/analytics/"
   		},
   		{
   			"title" : "Honor Code Certificate for  Introduction to Computer Science and Programming Using Python",
   			"school" : "MITx in edX",
    		"dates" : "November 2014",
   			"url": "https://courses.edx.org/courses/MITx/6.00.1x_5/1T2015/info"
   		}
    ],
    "display" : function() {
    	for (school in education.schools) {

			$("#education").append(HTMLschoolStart);

			var formattedSchoolName = HTMLschoolName.replace("%data%", education.schools[school].name);
			var formattedSchoolDegree = HTMLschoolDegree.replace("%data%", education.schools[school].degree);
			var formattedSchoolDates = HTMLschoolDates.replace("%data%", education.schools[school].dates);
			var formattedSchoolLocation = HTMLschoolLocation.replace("%data%", education.schools[school].location);
			var formattedSchoolMajor = HTMLschoolMajor.replace("%data%", education.schools[school].major);
			var formattedSchoolURL = HTMLschoolURL.replace("%data%", education.schools[school].url);

			$(".education-entry:last").append(formattedSchoolName + formattedSchoolDegree)
									  .append(formattedSchoolDates)
									  .append(formattedSchoolLocation)
									  .append(formattedSchoolMajor)
									  .append(formattedSchoolURL);
		}

		for (online in education.onlineCourses) {

			$('#onlineEducation').append(HTMLonlineClasses);

			var formattedOnlineTitle = HTMLonlineTitle.replace("%data%", education.onlineCourses[online].title);
			var formattedOnlineSchool = HTMLonlineSchool.replace("%data%", education.onlineCourses[online].school);
			var formattedOnlineDates = HTMLonlineDates.replace("%data%", education.onlineCourses[online].dates);
			var formattedOnlineURL = HTMLonlineURL.replace("%data%", education.onlineCourses[online].url);

			$(".onlineEducation-entry:last").append(formattedOnlineTitle + formattedOnlineSchool)
									  .append(formattedOnlineDates)
									  .append(formattedOnlineURL);
		}
    }
};

var work = {
	"jobs" : [
		{
			"employer": "Little Wisemen Inc.",
			"title": "Digital Media Specialist (Part Time)",
			"location": "Toronto, ON",
			"dates" : "Augest 2014 to Present",
			"description": "• Analyze business and technical requirement, design and implement social media content and marketing execution plan. • Successfully manage and execute promotion campaigns over busy holiday season. • Practice the use of Wordpress, Magento and Atlassian for business need."
		},
		{
			"employer": "Jinan Joinsoft Co.Ltd",
			"title": "Internship",
			"location": "Jinan, China",
			"dates" : "June 2014",
			"description": "• Familiarized in agile methodology and development cycle. • Practiced Axure RP, OmniGraffle, OmniPlan and MindManager based on a project of Jinan real estate financial management system. Learnt and practiced the fundamental knowledge of Oracle 11g, UML."
		}
		],
	"display" : function() {
		for (job in work.jobs) {

			$("#workExperience").append(HTMLworkStart);

			var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[job].employer);
			var formattedTitle = HTMLworkTitle.replace("%data%", work.jobs[job].title);
			var formattedEmployerTitle = formattedEmployer + formattedTitle;
			var formattedWorkDates = HTMLworkDates.replace("%data%", work.jobs[job].dates);
			var formattedWorkLocation = HTMLworkLocation.replace("%data%", work.jobs[job].location);
			var formattedWorkDescription = HTMLworkDescription.replace("%data%", work.jobs[job].description);

			$(".work-entry:last").append(formattedEmployerTitle)
								.append(formattedWorkLocation)
								.append(formattedWorkDates)
								.append(formattedWorkDescription);
		}
	}
};


work.display();

bio.display();

projects.display()

education.display()

$("#mapDiv").append(googleMap);

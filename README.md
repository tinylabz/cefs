BSE23-16
Complaint Evaluation and Feedback System
Software Design Document
Prepared by

NAME
REGISTRATION NUMBER
STUDENT NUMBER
UWIMAANA OLIVIA
19/U/12119/PS
1900712119
AWORI BRIDGET DESIRE
19/U/12644/PS
1900712644
ANYANGO JOANITA WANDERA
19/U/13348/PS
1900713348
KAWEESI SIMON PETER
19/U/12766/PS
1900712766

Department of Networks
School of Computing and Informatics technology
College of Computing and Information Sciences
Makerere University
10th-Mar-2023

1. INTRODUCTION	3
1.1 Purpose	3
1.2 Scope	3
1.3 Overview	3
1.4 Reference Material	3
1.5 Definitions and Acronyms	3
2. SYSTEM OVERVIEW	3
3. SYSTEM ARCHITECTURE	4
3.1 Architectural Design	4
3.2 Decomposition Description	4
3.3 Design Rationale	4
4. DATA DESIGN	4
4.1 Data Description	4
4.2 Data Dictionary	4
5. COMPONENT DESIGN	4
6. HUMAN INTERACTION DESIGN	5
6.1     Overview of User Interface	5
6.2    Screen Images	5
6.3    Screen Objects and Actions	5
7. REQUIREMENTS MATRIX	5
8. APPENDICES	5

INTRODUCTION
Purpose
This Software Design Document (SDD) specifies the architecture and the system design of a Complaint Evaluation and Feedback System (CEFS).  CEFS is to provide a platform for the students to submit their complaints and attach feedback from their respective lecturers. This system shall help us improve the result complaint resolution process by identifying the key complaints and suggesting possible improvements. Furthermore, CEFS will be responsible for collecting complaints and feedback, analyzing it, and giving reports to relevant stakeholders. The system will provide a user-friendly experience since it will have a chatbot that offers assistance in case a user gets stuck.  CEFS shall be used primarily by Makerere students and the respective staff. The intended audience includes system developers, system testers, project managers, system maintainers, students, and staff of Makerere University.
Scope
The Complaint Evaluation and Feedback System is used to accept, process, and resolve complaints that are related to students' results at Makerere University. The scope covers the following areas:
Submission of complaints and feedback: CEFS will allow students to submit complaints and acquire feedback from the lecturers related to academic results including missing marks, remarking in case of under-grading, wrong academic year allocated.
Processing of complaints and feedback: CEFS will provide a systematic and structured process of the evaluation, review, and resolution of the complaints by the lecturers and college registrar. It will make sure these complaints are effectively handled.
Communication with students: CEFS shall ensure that the different students get the communication and feedback related to the complaints clearly, timely, and in a transparent way. This shall have automated notifications about the feedback.
Tracking and reporting: CEFS will enable the tracking of complaints and feedback through a centralized database, providing reports and statics on the number of complaints, nature, and the kind of feedback over time.
Chatbot Interface: CEFS will include a chatbot interface that will allow users to submit complaints and feedback through a conversational interface. The chatbot will be designed to provide a user-friendly experience.
Multiple Channels: In addition to the chatbot interface, CEFS  will allow users to submit complaints and feedback through web-based forms
Continuous improvement: CEFS will provide a mechanism for the continuous improvement of the system and the quality of academic results. The system will enable the identification of trends, issues, and areas for improvement related to academic results and the complaints process.
The CEFS will be accessible to all students at Makerere University and will be implemented in accordance with the university's policies and regulations on academic results and complaints. The system will also comply with data protection and privacy laws and regulations.
Overview
The document has seven sections. The first section is an introduction, which contains the document's purpose, scope, overview, reference material, definitions, and acronyms. The second section gives  a system overview, which describes the system being proposed. Section three is the system architecture, which has the system's architectural design, decomposition description, and design rationale.  Section four is the data design, which has a data description and a dictionary. Section 5 is  a component design that gives an overview of the components of the proposed system. Section six  gives the human interface design, which contains an overview of the human interfaces, screen  images, screen objects, and actions of the system intended to be developed. Section 7 is the requirement matrix, which is used to trace system requirements. Section eight has the appendices.
Reference Material

Definitions and Acronyms

SYSTEM OVERVIEW
The system being developed is a web-based application called "CEFS." The purpose of CEFS is to provide an online platform for Students to easily raise complaints regarding results  and to follow up the progress of resolution
On the other hand the CEFS is also to be used by the administrative body of the university to easily monitor complaints, solve them effectively and also give immediate feedback to the students
The CEFS application consists of several major components, including:
User Interface: The user interface allows system users to interact with the system  in order to run the different system functionalities
User access control & role assignment module: This module is used to authenticate users so that only authorized users can access the application.
Chat bot :performs a variety of tasks, such as answering questions, providing customer support
Analysis module: Analysis programs are software applications that are designed to analyze data and provide insights or recommendations based on the analysis
Database: The database stores information about students, HOD and lecturers
Feedback Module: information provided to users of a website or web application, often in response to an action they have taken on the site

SYSTEM ARCHITECTURE
Architectural Design

This architecture is commonly used in web applications, where the client is a web browser and the server is a web server. The client sends requests to the web server, which processes the requests and sends back HTML pages or other content to the client.
With any device connected to the internet, i.e., a smartphone or a computer, the user sends a request message to the server through the browser by using the correct domain name. The server processes the request and sends back a response message to the client. The client then processes the response and accesses the different web services/functionalities

Decomposition Description
Top level DFD


Design Rationale
Scalability
The client-server model is highly scalable, allowing multiple clients to access a server simultaneously. This makes it ideal for the application to handle a large number of users
Centralized control
By having a centralized server, it is easier to manage and control the system, including security, access, and data storage.
Flexibility
The client-server architecture allows for flexibility in terms of hardware and software components, making it easier to add or remove components as needed.
Robustness: The client-server architecture is more resilient to hardware and software failures since the server can continue to function even if a client or multiple clients fail.
Other Architectures
Peer-to-peer (P2P) architecture: This architecture involves a decentralized network where all the nodes act as both clients and servers. P2P architecture can be useful for systems where there is no central authority, but it can be challenging to manage and secure.
Microservices architecture: In this architecture, the system is divided into small, independently deployable services that communicate with each other via APIs. Microservices architectures can be more flexible and scalable than the client-server model, but they can also be more complex to manage.
Ultimately, the choice of architecture will depend on the specific requirements and constraints of the system, as well as the trade-offs between different architectures. The client-server architecture is a well-established and widely used model that can be suitable for many applications
DATA DESIGN

Data Description
Since the CEFS is an information-based system, the users of the system are expected to create, manipulate, update, and delete data. This section therefore gives a description of the data structures of the system.  -relational database management system (RDBMS). The database schema includes the following tables:
Student: Store user account information such as name.  password, Year of study, students number, registration number
Lecturer: Store lecturer’s information
Data input is validated using the following rules:
Usernames must be between 3 and 20 characters long and can only contain letters, numbers, and underscores.
Passwords must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.

Data communication between the client and server uses the following protocol:
HTTP protocol for client-server communication, with requests and responses encoded in JSON format.

Data Dictionary

COMPONENT DESIGN
Login  and user level data access

Prompt the user to enter their username and password
username = input("Enter your username:")
password = input("Enter your password:")
Verify the user's credentials
if verify_credentials(username, password):
     If the user's credentials are valid, assign them a role based on their username
    if username == "admin":
        role = "admin"
    else:
        role = "regular_user"

    // Log the user in and display a welcome message
    login_user(username, role)
    print("Welcome, " + username + "!")
else:
    // If the user's credentials are invalid, display an error message
    print("Invalid username or password. Please try again.")



Pseudo code
If user is logged in
If user role is x
Display specific dashboard (sub-menu) for user role x
Else
Redirect the user to the login interface.


Chatbot
InThis pseudocode represents a basic chatbot that can respond to user input based on pre-defined keywords or using an AI algorithm or rule-based system. It starts by displaying a greeting message and then enters a loop that reads the user's input and generates a response.
If the user's input matches a specific keyword, the chatbot will respond with a pre-defined message. Otherwise, it will generate a response using an AI algorithm or rule-based system. Finally, it will display the response to the user and repeat the loop until the chatbot is terminated.
Initialize the chatbot
2. Display a greeting message
3. While true:
4.    Read user input
5. If input matches a specific keyword,
6. Respond with a pre-defined message
7.Else:
8.Generate a response using an AI algorithm or rule-based system
9.    Display the response
10. End While
11.Terminate the chatbot

Analysing Module

1. Start by reading the document to be analyzed.
2. Set the keyword to be searched for.
3. Set a counter variable to zero.
4. For each word in the document:
     a. If the word matches the keyword:
          i. Increment the counter variable by 1.
5. Print the value of the counter variable as the result of the analysis.

This pseudocode analyzes multiple documents by incorporating a loop to iterate over each document and perform the same keyword search analysis
by using an array to store the keywords and to check if the current word matches any of the keywords in the array.

Evaluation and Feedback

START
SET process_status = evaluate_process() // Evaluate the process status
IF process_status == "resolved" THEN // If the process has been resolved
    SET email_message = "The process has been resolved." Set the email message
    SEND_EMAIL(email_message) // Send the email message
END IF
END

// Function to evaluate the process status
FUNCTION evaluate_process()
    Evaluate the process
     If the process is resolved, return "resolved"
     Otherwise, return "unresolved"
END FUNCTION

FUNCTION SEND_EMAIL(message)
    // Code to send email message
END FUNCTION

HUMAN INTERACTION DESIGN
6.1     Overview of User Interface
The system is fully a role-based system, where the different stakeholders will have different interactions with the system. Every action performed by the stakeholders will be stored in the database for evaluation and feedback. The actions to be performed include logging in, registering, submitting a complaint, uploading mark sheets, and printing attendance sheets.

REQUIREMENTS MATRIX

Requirement ID
Business Use Case
Priority
Test Cases
Functional/Non-functional
SA001
User input
High
- User enters text input and it is captured by the system
Functional
SA002
Keyword analysis
High
- System analyzes keywords from input and provides relevant feedback
Functional
SA003
Feedback response
High
- System responds with relevant feedback based on keyword analysis
Functional
CS001
Complaint type specification
High
- User specifies complaint type
Functional
CS002
Dynamic form load
High
- Appropriate form is loaded based on complaint type
Functional
CS003
Detail verification
High
- Details are verified when user clicks submission button
Functional
CS004
Submission message
High
- System displays message after submission success or failure
Functional
RC001
Notification to lecturer
High
- Email notification sent to lecturer upon complaint submission
Functional
RC002
One-click resolution
High
- Lecturer can resolve complaint with one click after logging in
Functional
RC003
Notification to student
High
- Notification sent to student after resolution showing resolved or recommendations in case of failure
Functional
GF001
Notification to lecturer
High
- Notification sent to lecturer upon complaint submission
Functional
GF002
Issue detection and suggestions
High
- System identifies issues and gives suggestions to lecturer
Functional
GF003
Complaint Resolution button
High
- Lecturer clicks "done" button after complaint resolution
Functional
GF004
Notification to student
High
- Notification sent to student after complaint resolution
Functional
PR001
Stable connection
High
- System maintains stable and reliable internet connection for complaint submission
Non-functional
PR002
User-friendly interface
High
- System should be easy to set up and use with clear instructions for users
Non-functional
PR003
Data security
High
- System should be secure with encryption and prevent unauthorized access
Non-functional
PR004
Authentication
High
- Authorized users can easily access the system with authentication
Non-functional
PR005
Response time
Medium
- Response time for analysis should not exceed 80 seconds for reputable internet connection speed
Non-functional
PR006
Scalability
Medium
- Number of connections should not slow down the application to a large degree
Non-functional
PR007
Flexibility
Medium
- System should be flexible for addition of future perspectives
Non-functional


APPENDICES


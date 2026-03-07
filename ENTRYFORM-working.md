# Hackathon Submission Entry form

## Team name
Core Power Delta Task Force Omega

## Category
Best tool supporting Sitecore Development (not built on Sitecore)

## Description
The purpose of this module is to serve as a companion for development and learning. Our team identified 3 areas in which development teams could be better supported:
1. Accessing synthesized, broader official and community knowledge of Sitecore Products for support with broad and specific answers and suggestions during pitch, discovery, prototype, and development activities
2. Accessing a personalized, interactive, learning path outside of Sitecore elearning and developer documentation
3. Broadening the range of practice questions available to professionals pursuing certifications and ongoing sharpening of Sitecore platform skills and understanding

Drawing from Sitecore resources, this interactive tool visualizes core platform concepts as defined by Sitecore to support developers in their learning and implementation journies. Core concepts are represented in varying sizes that serve as an indicator of it's relative significance/complexity. Users are able to select a topic to view a summary, links to official related resources, and take a quiz to test their understand the topic. 

This experience is powered by a serializatoin service which provides the app access to Sitecore documentation data and vectorizes it for AI Agents that generate quizzes and chat responses.

## Video link
⟹ Provide a video highlighing your Hackathon module submission and provide a link to the video. You can use any video hosting, file share or even upload the video to this repository. _Just remember to update the link below_

⟹ [Replace this Video link](#video-link)

## Installation instructions

Visit ![https://two026-core-power-delta-task-force-omega.onrender.com](https://two026-core-power-delta-task-force-omega.onrender.com) to enjoy the experience.
This a standalone app accessible in a browser. There are no additional installation instructions. 

## Usage instructions
The app homepage is a diagram of core competencies for the default Sitecore product, Sitecore AI. The user sees these sized base on their relative prevalance/emphasis across documentation and community data (forums, blogs, etc). 
![Homepage](images/1%20-%20app%20homepage.png)

Here, the user can:
- select a different product to explore using a dropdown as shown here
![Product Selection](images/2%20-%20product%20selection.png)

- select a topic by clicking it
![Select topic](images/2%20-%20product%20selection.png)

- viewing topic summary/related resources and optionally start testing knowledge with a quiz upon selection
![Select topic](images/4%20-%20selecting%20topic%20to%20view%20details.png)

- take Agent generated quiz to test platform knowledge and recieve feedback on answers
![Take q](images/5%20-%20accessing%20quiz.png)
![Quiz feedback](images/6%20-%20quiz%20feedback.png)

- interact with Agent via chat for conversational platform support
![Agent chat](images/7%20-%20accessing%20chat%20experience.png)


## Comments

Additional implementation details are available in the following README files:
![Web App README](apps/web/README.md)
![App Agent Service README](apps/df-agent-service/README.md)
![Serialization Agent Service README](apps/df-serializer-service/README.md)
# Main Features of 1Announce Group - B

We have three major features in this Full STack MERN Application:

1. `Authentication`:

    * Authentication is one of the most important features of this project. We used firebase authentication for authenticating the user into the system.
    User will be displayed with a front page for Sign up and Sign In Functionality. We used conditional rendering to acheive both Sign up and Sign in efficiently in a single page without having to traverse to  new route.
    Currently a new user can only Sign up by providing their `Email` and `Password` such that next time user logs into the system, they will be authenticated using user object of firebase OAuth. We have a plan to implement authentications using `Google`, `Facebook` and `Github` in future sprints.




2. `Channel Integration for Slack`:
   
    * Slack provides rich APIs to authorise users along with their basic info like channels and team_id.
      
    * This feature will allow user to authorise their slack workspace with 1announce so that they can post announcement on desired channel.
      
    * Additionally, this features provides DB connection and stores user data (i.e. Email, Auth Token, channel name etc.) to MongoDB Cloud Atlas so that it can later be used while creating announcement
      
    * This feature also provides backend for posting various kinds of attachments like images, media, text in the form of slack blogs.


3. `User Inerface for broadcasting Announcements`:

   * The feature named ‘Broad Cast Announcement Form’ helps the user in writing the messages to be broadcasted along with any media content if necessary. 

   * It also provides an option to select the date and time when the broadcasting needs to be triggered to different channels. 

   * We are implementing the following channels Microsoft Teams, Slack and Twitter.

   * The first-time users will be displayed with an option to authorize the channels and only when the users click the particular channel the tokens will be created to get the authorization for that particular channel. Once the Authorization is completed the users will be given the option to select that channel to broadcast the message.

   * All the routing calls will be handled in the coming sprints.

    
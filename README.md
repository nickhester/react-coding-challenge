## This Fork

This fork is Nick's take on the coding challenge. Below is the original README.

## React Coding Challenge

This code challenge tests your skills in react.js, testing and modular design.
The purpose of the application is to correctly render a stream of messages coming from an api. Different messages will be coded different colors and require slightly different rendering. The rules are described in detail below.

This challenge already includes an API response. It is not required or expected for you to make any changes to this interaction.

The 3 priorities that we provide you are:
  * 1 = error
  * 2 = warning
  * 3 = info

### Acceptance Criteria

1. Messages should be rendered in a table-like structure. The newest messages should appear at the top of their respective columns.

1a. Use the mockup below. It contains some inconsistencies. Please ensure that your app represents a good faith effort at matching the mockup within reason. We welcome follow up questions if you have them.

![Example Design](https://github.com/helpdotcom/react-coding-challenge/raw/master/grid.png)


2. The messages should be color coded depending on the priority of the message. The appropriate color per priority is:

   * error: #F56236
   * warning: #FCE788
   * info: #88FCA3

3. Each time a message with the priority level of error is received, a snackbar containing the error message should also appear at the top of the application. The error should disappear in 2 seconds, when another error message takes its place, or when the user clears it via the provided button located in the error message.
4. A user should be able to clear all messages at any point.
5. A user should be able to clear a specific message in a specific column
6. A user should be able to start and stop incoming messages. By default the messages should be running and displaying on the grid. The start/stop button should update depending on the state of the feed.
7. A user should see a count of specific messages in each column
8. Use material-ui components and JSS styles.
9. Test your application to the degree that you feel comfortable with. No specific testing frameworks are required. We have left a failing test for a breadcrumb.

*** Applicants are provided this challenge with no expectation on deadline. Please take the time you need to complete the challenge to the best of your ability. ***

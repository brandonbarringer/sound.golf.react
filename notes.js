/**
 When the app loads
  1. Get the user's location
  2. Get the humidity, temperature, and altitude at that location
  3. show the user the humidity, temperature, and altitude and ask them to make any adjustments (such as a change to temperature if they are indoors)
  4. ask the user to input the distance from the microphone to the ball
  5. ask the user to input the distance from the microphone to the impact point
  6. ask the user to input the distance from the ball to the impact point
  7. start recording
  8. we continuously record until we detect both a swing and an impact
  9 we get the time between the swing and the impact
  10. we calculate the ball speed based on the time between the swing and the impact
  11. from the ball speed, we calculate the clubhead speed, carry, total distance, and smash factor
  12. we show the user the results
  14. go back to step 7
*/

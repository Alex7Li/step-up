exports.handler = function(context, event, callback) {
    const TWILIO_ACCOUNT_SID = "AC008448861bd1396c2fc2066f8bba60d5";
    const TWILIO_API_KEY = "SK46d1cb126dc803642730a1841b088c20";
    const TWILIO_API_SECRET = "Ilp8VhLDR0KniLQJG0CqZIPB4KLRPCrD";
    const ACCESS_TOKEN_IDENTITY =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);  // random client name 

    const ROOM_NAME = 'tf';  // fixed room name
    const AccessToken = Twilio.jwt.AccessToken;
    const VideoGrant = AccessToken.VideoGrant;
    // only tokens are available for participating rooms
    // Create a Video grant enabling client to use Video, only for this room 
    const videoGrant = new VideoGrant({
        room: ROOM_NAME
    });
    //Create an access token to sign and return to the client with the grant we just created
    const accessToken = new AccessToken(
        TWILIO_ACCOUNT_SID,
        TWILIO_API_KEY,
        TWILIO_API_SECRET
    );
    accessToken.addGrant(videoGrant); //Add the grant to the token
    accessToken.identity = ACCESS_TOKEN_IDENTITY;
    callback(null, {
        token: accessToken.toJwt() //Serialize the token to a JWT string
    });
};
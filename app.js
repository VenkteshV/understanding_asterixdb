$(document).ready(function() {

  function addResult(dom, res) {
      $(dom).append(res.replace(/},/g, "},\n"));
  }

  var A = new AsterixDBConnection().dataverse("TinySocial");


  var expression0a = new FLWOGRExpression()
    .ForClause("$user", new AExpression("dataset FacebookUsers"))
    .WhereClause(new AExpression("$user.id = 8"))
    .ReturnClause("$user");

  var success0a = function(res) {
      addResult('#result0a', JSON.stringify(res));
  };

  A.query(expression0a.val(), success0a);

  var expression0b = new FLWOGRExpression()
    .ForClause("$user", new AExpression("dataset FacebookUsers"))
    .WhereClause().and(new AExpression("$user.id >= 2"), new AExpression("$user.id <= 4"))
    .ReturnClause("$user");

  var success0b = function(res) {
      addResult('#result0b', JSON.stringify(res));
  };

  A.query(expression0b.val(), success0b);

  var expression1 = new FLWOGRExpression()
    .ForClause("$user", new AExpression("dataset FacebookUsers"))
    .WhereClause().and(
       new AExpression("$user.user-since >= datetime('2010-07-22T00:00:00')"),
       new AExpression("$user.user-since <= datetime('2012-07-29T23:59:59')")
    ).ReturnClause("$user");

  var success1 = function(res) {
      addResult('#result1', JSON.stringify(res));
  };

  A.query(expression1.val(), success1);

  var expression2a = new FLWOGRExpression()
      .ForClause("$user", new AExpression("dataset FacebookUsers"))
      .ForClause("$message", new AExpression("dataset FacebookMessages"))
      .WhereClause(new AExpression("$message.author-id = $user.id"))
      .ReturnClause({
         "uname" : "$user.name",
         "message" : "$message.message"
      });

  var success2a = function(res) {
      addResult('#result2a', JSON.stringify(res));
  };

  A.query(expression2a.val(), success2a);

  var expression2b = new FLWOGRExpression()
    .ForClause ("$user", new AExpression("dataset FacebookUsers"))
    .ForClause ("$message", new AExpression("dataset FacebookMessages"))
    .WhereClause(new AExpression("$message.author-id /*+ indexnl */  = $user.id"))
    .ReturnClause({
       "uname" : "$user.name",
       "message" : "$message.message"
    });

  var success2b = function(res) {
      addResult('#result2b', JSON.stringify(res));
  };

  A.query(expression2b.val(), success2b);

  var expression3messages = new FLWOGRExpression()
    .ForClause("$message", new AExpression("dataset FacebookMessages"))
    .WhereClause(new AExpression("$message.author-id = $user.id"))
    .ReturnClause("$message.message");

  var expression3 = new FLWOGRExpression()
    .ForClause ("$user", new AExpression("dataset FacebookUsers"))
    .ReturnClause({
        "uname": "$user.name",
        "messages" : expression3messages
    });

  var success3 = function(res) {
      addResult('#result3', JSON.stringify(res));
  };

  A.query(expression3.val(), success3);

  var expression4messages = new FLWOGRExpression()
    .ForClause( "$t2", new AExpression("dataset TweetMessages"))
    .WhereClause( new AExpression("spatial-distance($t.sender-location, $t2.sender-location) <= 1"))
    .ReturnClause({ "msgtxt" : "$t2.message-text" });

  var expression4 = new FLWOGRExpression()
    .ForClause( "$t", new AExpression("dataset TweetMessages"))
    .ReturnClause({
        "message" : "$t.message-text",
        "nearby-messages" : expression4messages
    });

  var success4 = function(res) {
      addResult('#result4', JSON.stringify(res));
  };

  A.query(expression4.val(), success4);

  var similarUsersExpression = new FLWOGRExpression()
      .ForClause("$t", new AExpression("dataset TweetMessages"))
      .LetClause ("$tu", new AExpression("$t.user"))
      .WhereClause(new AExpression("$tu.name ~= $fbu.name"))
      .ReturnClause({
          "twitter-screenname": "$tu.screen-name",
          "twitter-name": "$tu.name"
      });

  var expression5 = new FLWOGRExpression()
      .ForClause ("$fbu", new AExpression("dataset FacebookUsers"))
      .ReturnClause(
          {
              "id" : "$fbu.id",
              "name" : "$fbu.name",
              "similar-users" : similarUsersExpression
          }
      );

  var success5 = function(res) {
      addResult('#result5', JSON.stringify(res));
  };

  var simfunction = new SetStatement( "simfunction", "edit-distance" );
  var simthreshold = new SetStatement( "simthreshold", "3");

  A.query([simfunction.val(), simthreshold.val(), expression5.val()], success5);

  var expression6 = new FLWOGRExpression()
    .ForClause("$fbu", new AQLClause().set("dataset FacebookUsers"))
    .WhereClause(
        new QuantifiedExpression (
            "some" ,
            {"$e" : new AExpression("$fbu.employment") },
            new FunctionExpression("is-null", new AExpression("$e.end-date"))
        )
    )
    .ReturnClause("$fbu");

  var success6 = function(res) {
      addResult('#result6', JSON.stringify(res));
  };

  A.query(expression6.val(), success6);

});

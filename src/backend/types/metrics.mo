import UserTypes "users";
import ContentTypes "content";

module {
  public type Metrics = {
    totalUsers : Nat;
    activeSessions : Nat;
    contentItems : Nat;
    sevenDayChange : Float;
  };

  public type SearchResults = {
    userResults : [UserTypes.User];
    contentResults : [ContentTypes.ContentItem];
  };
};

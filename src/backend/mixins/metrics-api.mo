import MetricsTypes "../types/metrics";
import MetricsLib "../lib/metrics";
import UserLib "../lib/users";
import ContentLib "../lib/content";
import Map "mo:core/Map";

mixin (
  users : Map.Map<Text, UserLib.User>,
  contentItems : Map.Map<Text, ContentLib.ContentItem>,
) {
  public query func getMetrics() : async MetricsTypes.Metrics {
    MetricsLib.getMetrics(users, contentItems)
  };

  public query func searchAll(searchTerm : Text) : async MetricsTypes.SearchResults {
    {
      userResults = UserLib.searchUsers(users, searchTerm);
      contentResults = ContentLib.searchContent(contentItems, searchTerm);
    }
  };
};

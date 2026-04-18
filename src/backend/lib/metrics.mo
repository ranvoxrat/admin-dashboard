import MetricsTypes "../types/metrics";
import UserTypes "../types/users";
import ContentTypes "../types/content";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Int "mo:core/Int";

module {
  public type Metrics = MetricsTypes.Metrics;

  public func getMetrics(
    users : Map.Map<Text, UserTypes.User>,
    content : Map.Map<Text, ContentTypes.ContentItem>,
  ) : Metrics {
    let totalUsers = users.size();
    let contentItems = content.size();
    // Pseudo-random active sessions: time-based value mod 20 + 1 (range 1–20)
    let t = Time.now();
    let activeSessions = (Int.abs(t) % 20) + 1;
    // Pseudo-random sevenDayChange: float between -10.0 and +20.0
    let raw : Nat = Int.abs(t) % 30;
    let sevenDayChange : Float = raw.toFloat() - 10.0;
    {
      totalUsers;
      activeSessions;
      contentItems;
      sevenDayChange;
    }
  };
};

import Map "mo:core/Map";
import UserLib "lib/users";
import ContentLib "lib/content";
import UsersMixin "mixins/users-api";
import ContentMixin "mixins/content-api";
import MetricsMixin "mixins/metrics-api";

actor {
  let users = Map.empty<Text, UserLib.User>();
  let nextUserId = { var value : Nat = 0 };

  let contentItems = Map.empty<Text, ContentLib.ContentItem>();
  let nextContentId = { var value : Nat = 0 };

  // Seed sample data on first init (collections start empty)
  UserLib.seedUsers(users, nextUserId);
  ContentLib.seedContent(contentItems, nextContentId);

  include UsersMixin(users, nextUserId);
  include ContentMixin(contentItems, nextContentId);
  include MetricsMixin(users, contentItems);
};

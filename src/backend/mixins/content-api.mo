import ContentTypes "../types/content";
import ContentLib "../lib/content";
import Map "mo:core/Map";

mixin (
  contentItems : Map.Map<Text, ContentLib.ContentItem>,
  nextContentId : { var value : Nat },
) {
  public query func getContent() : async [ContentLib.ContentItem] {
    ContentLib.listContent(contentItems)
  };

  public query func getContentItem(id : Text) : async ?ContentLib.ContentItem {
    ContentLib.getContentItem(contentItems, id)
  };

  public func createContent(
    title : Text,
    contentType : ContentTypes.ContentType,
    author : Text,
    status : ContentTypes.ContentStatus,
  ) : async ContentLib.ContentItem {
    ContentLib.createContent(contentItems, nextContentId, title, contentType, author, status)
  };

  public func updateContent(
    id : Text,
    title : ?Text,
    contentType : ?ContentTypes.ContentType,
    author : ?Text,
    status : ?ContentTypes.ContentStatus,
  ) : async ?ContentLib.ContentItem {
    ContentLib.updateContent(contentItems, id, title, contentType, author, status)
  };

  public func deleteContent(id : Text) : async Bool {
    ContentLib.deleteContent(contentItems, id)
  };

  public func togglePublish(id : Text) : async ?ContentLib.ContentItem {
    ContentLib.togglePublish(contentItems, id)
  };
};

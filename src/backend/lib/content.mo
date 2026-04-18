import ContentTypes "../types/content";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Array "mo:core/Array";

module {
  public type ContentItem = ContentTypes.ContentItem;
  public type ContentType = ContentTypes.ContentType;
  public type ContentStatus = ContentTypes.ContentStatus;

  public func listContent(items : Map.Map<Text, ContentItem>) : [ContentItem] {
    items.values().toArray()
  };

  public func getContentItem(items : Map.Map<Text, ContentItem>, id : Text) : ?ContentItem {
    items.get(id)
  };

  public func createContent(
    items : Map.Map<Text, ContentItem>,
    nextId : { var value : Nat },
    title : Text,
    contentType : ContentType,
    author : Text,
    status : ContentStatus,
  ) : ContentItem {
    let id = nextId.value;
    nextId.value += 1;
    let now = Time.now();
    let item : ContentItem = {
      id = id.toText();
      title;
      contentType;
      author;
      status;
      createdAt = now;
      updatedAt = now;
    };
    items.add(item.id, item);
    item
  };

  public func updateContent(
    items : Map.Map<Text, ContentItem>,
    id : Text,
    title : ?Text,
    contentType : ?ContentType,
    author : ?Text,
    status : ?ContentStatus,
  ) : ?ContentItem {
    switch (items.get(id)) {
      case null null;
      case (?existing) {
        let updated : ContentItem = {
          existing with
          title = switch (title) { case (?t) t; case null existing.title };
          contentType = switch (contentType) { case (?ct) ct; case null existing.contentType };
          author = switch (author) { case (?a) a; case null existing.author };
          status = switch (status) { case (?s) s; case null existing.status };
          updatedAt = Time.now();
        };
        items.add(id, updated);
        ?updated
      };
    }
  };

  public func deleteContent(items : Map.Map<Text, ContentItem>, id : Text) : Bool {
    switch (items.get(id)) {
      case null false;
      case (?_) {
        items.remove(id);
        true
      };
    }
  };

  public func togglePublish(items : Map.Map<Text, ContentItem>, id : Text) : ?ContentItem {
    switch (items.get(id)) {
      case null null;
      case (?existing) {
        let newStatus : ContentStatus = switch (existing.status) {
          case (#Published) #Draft;
          case (#Draft) #Published;
        };
        let updated : ContentItem = {
          existing with
          status = newStatus;
          updatedAt = Time.now();
        };
        items.add(id, updated);
        ?updated
      };
    }
  };

  public func searchContent(items : Map.Map<Text, ContentItem>, searchTerm : Text) : [ContentItem] {
    let lower = searchTerm.toLower();
    items.values().filter(func(item : ContentItem) : Bool {
      item.title.toLower().contains(#text lower) or item.author.toLower().contains(#text lower)
    }).toArray()
  };

  // Seed sample content
  public func seedContent(items : Map.Map<Text, ContentItem>, nextId : { var value : Nat }) {
    let samples : [(Text, ContentType, Text, ContentStatus)] = [
      ("Getting Started Guide", #Page, "Alice Johnson", #Published),
      ("Top 10 Tips for Productivity", #Blog, "Bob Smith", #Published),
      ("API Documentation", #Resource, "Carol Williams", #Published),
      ("Upcoming Features Preview", #Blog, "Bob Smith", #Draft),
      ("Company Handbook", #Page, "Alice Johnson", #Draft),
    ];
    for ((title, contentType, author, status) in samples.values()) {
      ignore createContent(items, nextId, title, contentType, author, status);
    };
  };
};

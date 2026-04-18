import Common "common";

module {
  public type ContentId = Common.ContentId;
  public type Timestamp = Common.Timestamp;

  public type ContentType = {
    #Blog;
    #Page;
    #Resource;
  };

  public type ContentStatus = {
    #Draft;
    #Published;
  };

  public type ContentItem = {
    id : ContentId;
    title : Text;
    contentType : ContentType;
    author : Text;
    status : ContentStatus;
    createdAt : Timestamp;
    updatedAt : Timestamp;
  };
};

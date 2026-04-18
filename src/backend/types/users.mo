import Common "common";

module {
  public type UserId = Common.UserId;
  public type Timestamp = Common.Timestamp;

  public type UserRole = {
    #Admin;
    #Editor;
    #Viewer;
  };

  public type UserStatus = {
    #Active;
    #Inactive;
  };

  public type User = {
    id : UserId;
    name : Text;
    email : Text;
    role : UserRole;
    status : UserStatus;
    joinDate : Timestamp;
  };
};

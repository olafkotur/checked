class APIResponse<T>{
  T data;
  bool error;
  String errorMessage;

  bool get getError{
    return error;
  }

  APIResponse({this.data, this.error=false, this.errorMessage=""});
}
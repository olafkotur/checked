import 'package:checked_mobile_application/module/api_respose.dart';
import 'package:checked_mobile_application/services/notification_services.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';

class Notifications extends StatefulWidget {

  int userId;

  Notifications(this.userId);

  @override
  _NotificationState createState() => _NotificationState();
}

class _NotificationState extends State<Notifications> {

  NotificationServices get service => GetIt.I<NotificationServices>();

  APIResponse _apiresponse;

  _asyncNotificationsMethod() async {
    _apiresponse = await service.getNotificationsByUser(widget.userId);
    print(_apiresponse);
    return _apiresponse;
  }

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_){
      _asyncNotificationsMethod();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Notifications",style: 
          TextStyle(
            color: Colors.white,
          ),
        ),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: <Widget>[
            Container(
              width: MediaQuery.of(context).size.width,
              height: MediaQuery.of(context).size.height*0.8,
              child: FutureBuilder(
                future: _asyncNotificationsMethod(),
                builder: (BuildContext context, AsyncSnapshot snapshot){
                  switch (snapshot.connectionState) {
                    case ConnectionState.none:
                      return Text("Doing nothing");
                    case ConnectionState.waiting:
                      return new Center(child: new CircularProgressIndicator());
                    case ConnectionState.active:
                      return Text("");
                    case ConnectionState.done:
                      if(snapshot.data.data == null){
                        return new Center(child: new CircularProgressIndicator());
                      }else {
                        print(snapshot.data.data.length);
                        return  ListView.separated(
                        itemCount: snapshot.data.data.length,
                        itemBuilder: (BuildContext context, int index){
                          var formattedDate = snapshot.data.data[index]["createdAt"];
                          var date = new DateTime.fromMillisecondsSinceEpoch(formattedDate * 1000);

                          var priority = snapshot.data.data[index]["priority"] == 1
                                        ? Icon(Icons.priority_high)
                                        : Icon(Icons.low_priority);
                          return ListTile(
                            leading: priority,
                            title: Text(snapshot.data.data[index]["value"]),
                            subtitle: Text(date.toString()),
                          );
                        },
                        separatorBuilder: (context, index) {
                          return Divider();
                        },
                      );
                    }
                  }
                },
              )
            )
          ],
        ),
      ),
    );
  }


}
import 'package:checked_mobile_application/module/api_respose.dart';
import 'package:checked_mobile_application/screens/notifications.dart';
import 'package:checked_mobile_application/services/user_services.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';

class NewsFeed extends StatefulWidget {
  int userId;
  List membersIds;
  NewsFeed({this.userId,this.membersIds});
  
  @override
  _NewsFeedState createState() => _NewsFeedState();
}

class _NewsFeedState extends State<NewsFeed> {

  UserServices get service => GetIt.I<UserServices>();

  APIResponse _apiresponse;

  _getCommentsAsync() async {
    _apiresponse = await service.getComments(widget.membersIds);
    return _apiresponse;
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("NewsFeed",style: 
          TextStyle(
            color: Colors.white,
          ),
        ),
        actions: <Widget>[
          IconButton(
            icon: Icon(
              Icons.notifications,
              color: Colors.white,
            ),
            onPressed: () {
              Navigator.push(context,MaterialPageRoute(builder: (context) => Notifications(widget.userId)));
            },
          ),
          IconButton(
            icon: Icon(
              Icons.lock_outline,
              color: Colors.white,
            ),
            onPressed: () {
              showPrivacyPolicy(context);
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.all(10.0),
              child: Container(
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children:<Widget>[
                    Text("Showing filtered results",style: 
                      TextStyle(
                        fontWeight: FontWeight.w600,
                        fontSize: 15.3,
                      ),
                    ),
                    IconButton(icon: Icon(Icons.filter_list), onPressed:(){})
                  ]
                ),
              ),
            ),
            Container(
              width: MediaQuery.of(context).size.width,
              height: MediaQuery.of(context).size.height*0.8,
              child: FutureBuilder(
                future: _getCommentsAsync(),
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
                        return  ListView.builder(
                        itemCount: snapshot.data.data.length,
                        itemBuilder: (BuildContext context, int index){
                          print(snapshot.data.data[index]["createdAt"]);
                          return buildfeedbacktab(context,snapshot.data.data[index]["value"]);
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

  Container buildfeedbacktab(BuildContext context, String comment) {
return Container(
      child: Column(
        children:<Widget>[
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 10.0),
            child: Row(
              children:<Widget>[
                Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(40),
                    color: Colors.orange[400],
                  ),
                  height: 60.0,
                  width: 60.0,
                  child: Center(
                    child: IconButton(
                      icon: Icon(Icons.person), 
                      onPressed: (){
                        
                      },
                      color: Colors.white,
                      iconSize: 40,
                    ),
                  )
                ),
                SizedBox(width: 20.0,),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children:<Widget>[
                    Text("John Smith", style: 
                      TextStyle(
                        fontWeight:FontWeight.w600,
                      ),
                    ),
                    Text("Today at 14:42", style: 
                      TextStyle(
                        fontWeight:FontWeight.w500,
                        color: Colors.grey[600]
                      ),
                    ),
                  ]
                ),
              ],
            ),
          ),
          SizedBox(height: 10.0,),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 10.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: <Widget>[
                Container(
                  constraints: BoxConstraints(
                    minWidth: 130,
                    maxWidth: 130,
                  ),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(10),
                    color: Colors.orange[400]
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children:<Widget>[
                      Icon(Icons.remove_red_eye,color: Colors.white,),
                      SizedBox(width:10),
                      Text("Observation",style: 
                        TextStyle(
                          color: Colors.white
                        ),
                      )
                    ]
                  ),
                ),
              ],
            ),
          ),
          SizedBox(height:10.0),
          Container(
            width: MediaQuery.of(context).size.width,
            height: 400.0,
            child: Image(
              image: AssetImage("assets/checkedLogo.jpg"),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20,vertical:10.0),
            child: Container(
              child: Column(
                children: <Widget>[
                  Row(
                    children: <Widget>[
                      Text("Notes",style: TextStyle(
                        fontWeight: FontWeight.w800,
                        fontSize: 15
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height:10.0),
                  Row(
                    children: <Widget>[
                      Text(comment,style: TextStyle(
                        fontWeight: FontWeight.w400,
                        fontSize: 15
                        ),
                      ),
                    ],
                  ),
                  Row(
                    children: <Widget>[
                      Text("to fly like a superhero",style: TextStyle(
                        fontWeight: FontWeight.w400,
                        fontSize: 15
                        ),
                      )
                    ]
                  )
                ],
              ),
            ),
          ),
          // Padding(
          //   padding: const EdgeInsets.symmetric(horizontal: 20,vertical:10.0),
          //   child: Container(
          //     child: Column(
          //       children: <Widget>[
          //         Row(
          //           children: <Widget>[
          //             Text("Voice recording",style: TextStyle(
          //               fontWeight: FontWeight.w800,
          //               fontSize: 15
          //               ),
          //             ),
          //           ],
          //         ),
          //         SizedBox(height:5.0),
          //         Row(
          //           children: <Widget>[
          //             Text("I'm flying",style: TextStyle(
          //               fontWeight: FontWeight.w400,
          //               fontSize: 15
          //               ),
          //             ),
          //           ],
          //         ),
          //       ],
          //     ),
          //   ),
          // ),
        ]
      ),
    );
  }

  void showPrivacyPolicy(BuildContext context) {
    Dialog fancyDialog = Dialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12.0),
      ),
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20.0),
        ),
        height: 800.0,
        width: 700.0,
        child: Stack(
          children: <Widget>[
            Container(
              width: double.infinity,
              height: 300,
              decoration: BoxDecoration(
                color: Colors.grey[100],
                borderRadius: BorderRadius.circular(12.0),
              ),
            ),
            Container(
              width: double.infinity,
              height: 50,
              alignment: Alignment.bottomCenter,
              decoration: BoxDecoration(
                color: Colors.orange[300],
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(12),
                  topRight: Radius.circular(12),
                ),
              ),
              child: Align(
                alignment: Alignment.center,
                child: Text(
                  "Children Privacy Policy!",
                  style: TextStyle(
                      color: Colors.white,
                      fontSize: 20,
                      fontWeight: FontWeight.w600),
                ),
              ),
            ),
            Align(
              alignment: Alignment.bottomCenter,
              child: InkWell(
                onTap: () {
                  Navigator.pop(context);
                },
                child: Container(
                  width: double.infinity,
                  height: 50,
                  decoration: BoxDecoration(
                    color: Colors.green[300],
                    borderRadius: BorderRadius.only(
                      bottomLeft: Radius.circular(12),
                      bottomRight: Radius.circular(12),
                    ),
                  ),
                  child: Align(
                    alignment: Alignment.center,
                    child: Text(
                      "Sounds good!",
                      style: TextStyle(
                          color: Colors.white,
                          fontSize: 20,
                          fontWeight: FontWeight.w600),
                    ),
                  ),
                ),
              ),
            ),
            Align(
              alignment: Alignment(-0.75, -0.35),
              child: Text("Checked is committed to ensuring that any personal data we hold about you and your child is protected in accordance with data protection laws and in line with your expectations. This privacy notice explains what personal data we collect, why we collect it, how we use it and how we protect it.We collect and use pupil information under: Education Act 1996 Data protection Act 1998 EU General Data Protection (GDPR) Article 6 and Article 9 from 25 May 2018. Article 6 says that to be lawful, data processing must comply with one of the following:Consent has been given to process personal data for a specific purpose It is necessary for a contract with an individual There is a legal obligation It is necessary for vital interests (eg to save a life) It is necessary for legitimate interests It is necessary for a public task which is in the public interest or has a clear basis in law. Article 9 deals with Special Category Data (racial/ethnic origin,political opinion, religious or philosophical beliefs, trade union membership, genetic data, biometric data, health, sex life, sexual orientation) . Lawful processing of Special Category Data must comply with one Article 6 condition and one of the following: Consent has been given to process the data for a specific purpose It is necessary for vital interests There is an obligation under employment, collective agreement, social security or social protection law It is processed by a foundation, association or any other not-for-profit body with a political, philosophical, religious or trade union aim It is already made public by the data subject. It is used for the establishment, exercise or defence of legal claims It is necessary for reasons of substantial public interest It is necessary for health reasons.")
            ),
            Align(
              // These values are based on trial & error method
              alignment: Alignment(1.05, -1.05),
              child: InkWell(
                onTap: () {
                  Navigator.pop(context);
                },
                child: Container(
                  decoration: BoxDecoration(
                    color: Colors.grey[200],
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Icon(
                    Icons.close,
                    color: Colors.black,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
    showDialog(
        context: context, builder: (BuildContext context) => fancyDialog);
  }  
}
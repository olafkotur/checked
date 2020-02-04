import 'package:flutter/material.dart';

class NewsFeed extends StatefulWidget {
  @override
  _NewsFeedState createState() => _NewsFeedState();
}

class _NewsFeedState extends State<NewsFeed> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("NewsFeed",style: 
          TextStyle(
            color: Colors.white,
          ),
        ),
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
              child: ListView(
                children: <Widget>[
                  buildfeedbacktab(context),
                  buildfeedbacktab(context),
                  buildfeedbacktab(context),
                  buildfeedbacktab(context),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }

  Container buildfeedbacktab(BuildContext context) {
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
                      onPressed: (){},
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
                      Text("William asked to waer the cape and was pretending",style: TextStyle(
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
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20,vertical:10.0),
            child: Container(
              child: Column(
                children: <Widget>[
                  Row(
                    children: <Widget>[
                      Text("Voice recording",style: TextStyle(
                        fontWeight: FontWeight.w800,
                        fontSize: 15
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height:5.0),
                  Row(
                    children: <Widget>[
                      Text("I'm flying",style: TextStyle(
                        fontWeight: FontWeight.w400,
                        fontSize: 15
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          )
        ]
      ),
    );
  }
}
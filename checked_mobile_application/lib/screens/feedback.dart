import 'package:flutter/material.dart';
import 'decodejson.dart';
import 'dart:async';
import 'package:flutter/services.dart';

class FeedbackForm extends StatefulWidget {
  static const platform = const MethodChannel('ondeviceML');
  int userId;
  FeedbackForm(this.userId);

  @override
  _FeedbackFormState createState() => _FeedbackFormState();
}

class _FeedbackFormState extends State<FeedbackForm> {

  TextEditingController texts = new TextEditingController();
  List<int> inp = List();
  bool offensive = false;
  Color offensive_color = Colors.black;
  
  @override
  Widget build(BuildContext context) {
    Tokenize ondevice = Tokenize(1000, 'assets/devive_json.json');
    return Scaffold(
      appBar: AppBar(
        title: Text("Feedback Form",style: 
          TextStyle(
            color: Colors.white,
          ),
        ),
      ),
      body: Center(
          child: Container(
            child: Center(
                child: Column(
              children: <Widget>[
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: TextField(
                    onChanged: (text) {
                    if(text=="")
                    {
                      offensive_color = Colors.black;
                      setState(() {
                        
                      });
                    }
                    },
                    style: TextStyle(color: offensive_color,fontSize:18),
                    maxLines: 12,
                    decoration: InputDecoration(border: OutlineInputBorder()),
                    controller: texts,
                  ),
                ),
                Container(
                  width: 200,
                  child: RaisedButton(
                    shape: RoundedRectangleBorder(
                        borderRadius: new BorderRadius.circular(30.0)),
                    color: Colors.purple,
                    textColor: Colors.white,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        // CircularProgressIndicator(
                        //   valueColor:AlwaysStoppedAnimation<Color>(Colors.green),
                        //   backgroundColor:Colors.white,
                        // ),
                        Icon(Icons.text_fields),
                        SizedBox(
                          width: 10,
                        ),
                        Text("Send Feedback"),
                      ],
                    ),
                    onPressed: () {
                      ondevice.getTokenized(texts.text).then((value) {
                        inp = value;
                        print(inp);
                      }).then((_) {
                        _getPredictData().then((data) {
                          setState(() {});
                        });
                      });
                    },
                  ),
                ),
               
              ],
            )),
          ),
        ),
    );
  }

  // method that communicate with java code through platform specific channel
  Future<void> _getPredictData() async {
    try {
      final String result =
          await FeedbackForm.platform.invokeMethod('predictData', {"arg": inp});
      if (result == "1") {
        offensive_color = Colors.red;
        Scaffold.of(context).showSnackBar(
          SnackBar(
            content: Text('Feedback Sent'),
            duration: Duration(seconds: 3),
          )
        );
      } else {
        offensive_color = Colors.green;
        Scaffold.of(context).showSnackBar(
          SnackBar(
            content: Text('Unable to send feedback'),
            duration: Duration(seconds: 3),
          )
        );      }
    } on PlatformException catch (e) {
      print(e.message);
    }
  }
}

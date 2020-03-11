import 'package:flutter/material.dart';

class PrivacyPolicy extends StatefulWidget {
  @override
  _PrivacyPolicyState createState() => _PrivacyPolicyState();
}

class _PrivacyPolicyState extends State<PrivacyPolicy> {
  Map<String, bool> data = {
    "Terms and Conditions" : true,
    "Privacy Policy" : true,
    "GDPR Data Consent" : true
  };

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Consent Form",style: 
          TextStyle(
            color: Colors.white,
          ),
        ),
        actions: <Widget>[
          IconButton(
            icon: Icon(
              Icons.update,
              color: Colors.white,
            ),
            onPressed: () async {
              // update legal enpoint
            },
          ),
        ],
      ),
      body: Column (children: <Widget>[
      Container(
        margin: const EdgeInsets.all(20.0),
        decoration: BoxDecoration(
          border: Border.all(color: Colors.blueAccent)
        ),
        child: Row(
          children: <Widget>[
            Flexible(
              child: Text("Checked is committed to ensuring that any personal data we hold about you and your child is protected in accordance with data protection laws and in line with your expectations. This privacy notice explains what personal data we collect, why we collect it, how we use it and how we protect it.We collect and use pupil information under: Education Act 1996 Data protection Act 1998 EU General Data Protection (GDPR) Article 6 and Article 9 from 25 May 2018. Article 6 says that to be lawful, data processing must comply with one of the following:Consent has been given to process personal data for a specific purpose It is necessary for a contract with an individual There is a legal obligation It is necessary for vital interests (eg to save a life) It is necessary for legitimate interests It is necessary for a public task which is in the public interest or has a clear basis in law. Article 9 deals with Special Category Data (racial/ethnic origin,political opinion, religious or philosophical beliefs, trade union membership, genetic data, biometric data, health, sex life, sexual orientation) . Lawful processing of Special Category Data must comply with one Article 6 condition and one of the following: Consent has been given to process the data for a specific purpose It is necessary for vital interests There is an obligation under employment, collective agreement, social security or social protection law It is processed by a foundation, association or any other not-for-profit body with a political, philosophical, religious or trade union aim It is already made public by the data subject. It is used for the establishment, exercise or defence of legal claims It is necessary for reasons of substantial public interest It is necessary for health reasons. Privacy Policy Privacy Policy Privacy Policy Privacy PolicyPrivacy Policy")
            )
          ],
        )
      ),
      Expanded( 
        child :
        ListView(
        children: data.keys.map((String key) {
          return new CheckboxListTile(
            title: new Text(key),
            value: data[key],
            secondary: const Icon(Icons.data_usage),
            onChanged: (bool value) {
              setState(() {
                data[key] = value;
              });
            },
          );
        }).toList(),
        ),
      ),
      ])
    );
  }
}


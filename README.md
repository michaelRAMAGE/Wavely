# Wavely
Making your interaction with audio and video easier

# Instructions
1. Create a project on Firebase, which also creates
a project on Google Cloud Platform. 
2. In Database tab, Create Firestore database.
Set the rules accordingly. 
3. In Storage tab, Create a Storage Bucket. 
Set the rules accordingly. 
4. Go to Project Settings. The information you find
here will be needed for the creation of the .env file. 
5. Make .env file with the following credentials

PORT=your_port

UPLOAD_SERVER=server_to_handle_uploads

API_KEY_FILE_NAME=google_services_json_file_path

FB_apiKey=firebase_api_key

FB_projectId=projectid,

FB_authDomain=FB_projectId.firebaseapp.com

FB_storageBucket=google_cloud_storage_bucket_path

FB_messagingSendeIdr=firebase_messaging_sender_id

FB_appId=firebase_app_id

6. Download google-services.json for project and add to root 
of project. 

echo "Enter the name"
read name

echo "Profile pic URL"
read picUrl

echo "Enter the bio"
read bio

echo "Enter gender"
read gender

echo "Enter Age"
read age

echo "Enter username"
read username

echo "http://plum.mybluemix.net/registerUser?name=$name&profile_pic=$picUrl&bio=$bio&gender=$gender&age=$age&username=$username"

curl "http://plum.mybluemix.net/registerUser?name=$name&profile_pic=$picUrl&bio=$bio&gender=$gender&age=$age&username=$username"

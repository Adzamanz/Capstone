echo "Switching to main branch"
git checkout main

echo "Building app..."
pipenv run flask run

echo "deploying"
scp -r build/* zamzad@44.217.160.240/var/www/zamanzadeh.club

echo "Done!"

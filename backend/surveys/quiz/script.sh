#adding each txt file to one txt
for filename in *.txt
do
	cat "${filename}"
	echo
done > allFiles.txt

#separate first image from name
echo "allFiles.txt" | sed 's/png/&,/g;s/,$//'

#edit out everything before colon
#cat all file.txt
#while read line
#do
#	for word in $line
#		cut -d':' -f2



#get rid of extra brackets 

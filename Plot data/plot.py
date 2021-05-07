import numpy as np 
from matplotlib import pyplot as plt 


idCount = []
correctedRpiCount = []
rpiCount = []
avgDurOfStay = []

import csv
with open('data.csv') as csvData:
        csv_reader_object = csv.reader(csvData, delimiter=',')
        for row in csv_reader_object:
            x = np.arange(1,len(row)+1)
            for i in range(len(row)):
                if i%4 == 0:
                    idCount.append(int(row[i]))
                elif i%4 == 1:
                    correctedRpiCount.append(int(row[i]))
                elif i%4 == 2: 
                    rpiCount.append(int(row[i]))
                elif i%4 == 3:
                    avgDurOfStay.append(int(row[i]))
            print(row)
            print(idCount)
            print(correctedRpiCount)
            print(rpiCount)
            print(avgDurOfStay)


plt.title("Mast values") 
plt.xlabel("time (ticks)") 
plt.ylabel("count") 
plt.plot(x,idCount) 
plt.plot(x,correctedRpiCount)
plt.plot(x,rpiCount)
plt.plot(x,avgDurOfStay)
plt.show()
import numpy as np 
from matplotlib import pyplot as plt 

x = np.arange(16)
y = np.full(16,100)
z = 100/(1+(x/15))

plt.title("Korrekturfaktor") 
plt.xlabel("Verweildauer (min)") 
plt.ylabel("Anzahl ID's") 
plt.axis([0,15,0,110])
plt.plot(x,y, label="gemessener ID Wert") 
plt.plot(x,z, label="korrigierter ID Wert")
plt.legend()
plt.show()
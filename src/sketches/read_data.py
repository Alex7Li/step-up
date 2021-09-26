import json
import numpy as np
from sklearn.linear_model import LinearRegression as lr

print("read input")
filename1 = "floss_left.json"
filename2 = "floss_right.json"
def read_file(name):
  mat = []
  with open(name) as f:
    for line in f.readlines():
      arr = []
      if line == "\n":
        continue
      point = json.loads(line)
      for part in point['keypoints']:
        arr.append(part['position']['x'])
        arr.append(part['position']['y'])
      mat.append(np.stack(arr))
  ans = np.stack(mat)
  print(ans.shape)
  return ans

x_1 = read_file(filename1)
x_2 = read_file(filename2)
y_1 = np.zeros(x_1.shape[0])
y_2 = np.ones(x_2.shape[0])
x_3 = np.concatenate((x_1, x_2), axis=0)
y_3 = np.concatenate((y_1, y_2), axis=0)
#data = np.concatenate((x_3, y_3), axis=1)
# print(data.shape)
print(x_3.shape)
print(y_3.shape)
model = lr()
model.fit(x_3, y_3)
print((model.coef_))
print(model.intercept_)

from sklearn.metrics import accuracy_score as acc

print(acc(np.round(model.predict(x_2)), y_2, normalize = True))

from sklearn.metrics import accuracy_score
print(accuracy_score(model.predict(x), y), True)
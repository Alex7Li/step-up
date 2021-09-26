import json
import numpy as np

print("read input")
filename1 = input()
filename2 = input()
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
y_2 = np.ones(x_2.shape[1])
x_3 = np.concatenate((x_1, x_2), axis=0)
y_3 = np.concatenate((y_1, y_2), axis=0)
# data = np.concatenate((x_3, y_3), axis=1)
# print(data.shape)

from sklearn.metrics import accuracy_score
print(accuracy_score(model.predict(x), y), True)
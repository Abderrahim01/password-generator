import hashlib
import random
import argparse
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.ciphers import Cipher,algorithms,modes


parser = argparse.ArgumentParser()
parser.add_argument("master")
parser.add_argument("ident")
parser.add_argument("plateform")
parser.add_argument("num_char")

args = parser.parse_args()
master = args.master
num_char = int(int(args.num_char)/2)
plateform = args.plateform
ident = args.ident



str_tmp = master + plateform



key = str(int(hashlib.sha256(str_tmp.encode()).hexdigest(),16) % 10**32)
key = key.encode()

iv = ident
iv = str(int(hashlib.sha256(iv.encode()).hexdigest(),16) % 10**16)
iv = iv.encode()

msg = master
msg = str(int(hashlib.sha256(msg.encode()).hexdigest(),16) % 10**16)

while len(msg)!=16:
    msg = msg + '0'

#print("Key = ",key)
#print("iv  =",iv)

encryptor = Cipher(algorithms.AES(key),modes.CBC(iv),backend=default_backend()).encryptor()

ciphtertxt = encryptor.update(msg.encode()) + encryptor.finalize()
#print(ciphtertxt)

digest = hashes.Hash(hashes.SHAKE256(num_char), backend=default_backend())
digest.update(ciphtertxt)
hash_text = digest.finalize()
print(hash_text.hex())

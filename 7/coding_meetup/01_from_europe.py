# https://www.codewars.com/kata/582746fa14b3892727000c4f/train/python
# You will be given an array of objects (hashes in ruby) representing data
# about developers who have signed up to attend the coding meetup that you
# are organising for the first time.

# Your task is to return the number of JavaScript developers coming from Europe.

# For example, given the following list:

import functools
list1 = [
    {'firstName': 'Noah', 'lastName': 'M.', 'country': 'Switzerland',
        'continent': 'Europe', 'age': 19, 'language': 'JavaScript'},
    {'firstName': 'Maia', 'lastName': 'S.', 'country': 'Tahiti',
        'continent': 'Oceania', 'age': 28, 'language': 'JavaScript'},
    {'firstName': 'Shufen', 'lastName': 'L.', 'country': 'Taiwan',
        'continent': 'Asia', 'age': 35, 'language': 'HTML'},
    {'firstName': 'Sumayah', 'lastName': 'M.', 'country': 'Tajikistan',
        'continent': 'Asia', 'age': 30, 'language': 'CSS'}
]

list2 = [
    {'firstName': 'Oliver', 'lastName': 'Q.', 'country': 'Australia',
        'continent': 'Oceania', 'age': 19, 'language': 'HTML'},
    {'firstName': 'Lukas', 'lastName': 'R.', 'country': 'Argentina',
        'continent': 'Europe', 'age': 89, 'language': 'HTML'}
]

list3 = [
    {'firstName': 'Noah', 'lastName': 'M.', 'country': 'Switzerland',
     'continent': 'Europe', 'age': 19, 'language': 'JavaScript'},
    {'firstName': 'Noah', 'lastName': 'M.', 'country': 'Switzerland',
     'continent': 'Europe', 'age': 19, 'language': 'JavaScript'},
    {'firstName': 'Noah', 'lastName': 'M.', 'country': 'Switzerland',
     'continent': 'Europe', 'age': 19, 'language': 'JavaScript'},
    {'firstName': 'Noah', 'lastName': 'M.', 'country': 'Switzerland',
     'continent': 'Europe', 'age': 19, 'language': 'JavaScript'},
    {'firstName': 'Noah', 'lastName': 'M.', 'country': 'Switzerland',
     'continent': 'Europe', 'age': 19, 'language': 'lol'},
]


def reducer(dict):
    return 1 if "Europe" in dict.values() and "JavaScript" in dict.values() else 0


# def count_developers(lst):
#     return functools.reduce(lambda a, b: a + reducer(b), lst, 0)
    
def count_developers(lst):
    return sum(x["language"] == "JavaScript" and x["continent"] == "Europe" for x in lst)


def test():
    assert count_developers(list1) == 1
    assert count_developers(list2) == 0
    assert count_developers(list3) == 4

    print("ok")


test()

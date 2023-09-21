import {test, expect} from "bun:test"

/* 
https://en.wikipedia.org/wiki/Binary_heap#Heap_implementation
https://en.wikipedia.org/wiki/Heapsort

full binary tree in a heap
parent = floor((i-1)/2)
left   = (i * 2) + 1
right  = (i * 2) + 2
*/
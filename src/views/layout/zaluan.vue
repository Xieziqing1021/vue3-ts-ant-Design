<template />

<script lang="ts" setup>

  import { ref, onMounted } from 'vue'

  const lineData = ref([
    {
      name: 'base',
      score: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    },
    {
      name: 'devops',
      score: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    },
    {
      name: 'ads',
      score: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
    },
    {
      name: 'fulishe',
      score: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
    },
    {
      name: 'shequ',
      score: [41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
    },
    {
      name: 'qa',
      score: [51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
    },
    {
      name: 'sec',
      score: [61, 62, 63, 64, 65, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80],
    },
  ])
  const one = [
    {
      name: 'mobile',
    },
    {
      name: 'data',
    },
    {
      name: 'rec',
    },
    {
      name: 'ep',
    },
    {
      name: 'growth',
    },
    {
      name: 'search',
    },
    {
      name: 'media',
    },
    {
      name: 'live',
    },
    {
      name: 'mediacloud',
    },
    {
      name: 'ee',
    },
  ]

  const applicationData = ref([
    {
      PredLine: 'fulishe',
      Reason: {
        level: '低',
        riskVal: 23, // 风险数
      },
      application: 'notehubservice',
      key: 1,
      score: 93,
    },
    {
      PredLine: 'live',
      Reason: {
        level: '低',
        riskVal: 13,
      },
      application: '"localfeed"',
      key: 2,
      score: 43,
    },
    {
      PredLine: 'search',
      Reason: {
        level: '低',
        riskVal: 43,
      },
      application: '"javarns"',
      key: 3,
      score: 76,
    },
    {
      PredLine: 'shequ',
      Reason: {
        level: '低',
        riskVal: 29,
      },
      application: '"javarbs"',
      key: 4,
      score: 78,
    },
  ])
</script>

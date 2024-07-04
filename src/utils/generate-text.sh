#!/bin/bash

NUMBER_OF_LINES=100
OUT_FILE="big-file.txt"

echo "Gerando arquivo  $OUT_FILE com $NUMBER_OF_LINES linha..."

for (( i=1; i<=$NUMBER_OF_LINES; i++))
do
  # CONTENT="Linha $i: Este e o conteudo da linha $i." >> big-file.txt

  echo "Linha $i: $CONTENT" >> "$OUT_FILE"

  PERCENT=$(($i * 100 / $NUMBER_OF_LINES))

  printf "\rProgresso: [%-50s] %d%%" $(printf "#%.0s" $(seq 1 $(($PERCENT / 2)))) $PERCENT

done
  echo "Arquivo gerado com $NUMBER_OF_LINES





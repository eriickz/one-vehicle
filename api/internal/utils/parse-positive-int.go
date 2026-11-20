package utils

import (
	"errors"
	"strconv"
)

var ErrNotPositive = errors.New("the value must be a positive integer")

func ParsePositiveInt16(s string) (int16, error) {
	val, err := strconv.ParseInt(s, 10, 16)
	if err != nil {
		return 0, err
	}

	if val <= 0 {
		return 0, ErrNotPositive
	}

	return int16(val), nil
}

func ParsePositiveInt(s string) (int, error) {
	val, err := strconv.Atoi(s)
	if err != nil {
		return 0, err
	}

	if val <= 0 {
		return 0, ErrNotPositive
	}

	return val, nil
}

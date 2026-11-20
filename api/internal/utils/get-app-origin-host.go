package utils

import (
	"net/url"
)

func GetAppOriginHost(appOrigin string) (string, error) {
	parsedURL, err := url.Parse(appOrigin)
	if err != nil {
		return "", err
	}

	return parsedURL.Hostname(), nil
}
